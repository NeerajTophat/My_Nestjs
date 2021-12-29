import { Controller, Body , Get ,Post ,Res, UnauthorizedException, UseGuards} from '@nestjs/common'
import { userService } from './user.service'
import * as bcrypt from 'bcrypt';
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

import { JwtPayload } from './jwt-payload.interface';


@Controller('users')
export class userController {
	constructor( private readonly userService : userService, private jwtService: JwtService) {}

	@Post('signUp')
	async signUp(@Body() completeBody: {userName: string , email: string, password: string, mobileNumber: number } 
		){
		let hash = await bcrypt.hash(completeBody.password, 10)
		console.log(hash,"<=========hash")
		let user = await this.userService.signUp(completeBody,hash)
		return user;
	}

	@Post('logIn')
	async logIn(@Body() completeBody: {email: string, password: string}, @Res({passthrough: true}) response: Response){
		let logIn = await this.userService.logIn(completeBody)

			if(logIn){
			let match = await bcrypt.compare(completeBody.password, logIn.password)
			if(match){
				let userName = logIn.userName
				const payload: JwtPayload = { userName }
				let jwt: string = await this.jwtService.sign(payload)
				// response.cookie('jwt', jwt, {httpOnly: true});
				console.log(jwt,"<=======jwt")
				return jwt;
			}
			return {status: 0, message: 'Check Your Password'}

		}else{
			return {status: 0, message: 'Check Your Email'}
		}
	}

	@Post('getAllUser')
	@UseGuards(AuthGuard())
	async allUser() {
		let allUser = await this.userService.allUser()
		if(!allUser) {
			throw new UnauthorizedException('User Not Found!')

		}
		return allUser;
	}





}