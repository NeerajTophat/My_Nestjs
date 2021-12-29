import { Injectable , UnauthorizedException} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectModel } from '@nestjs/mongoose'


import { User } from './user.model'
import { Model } from 'mongoose'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor( @InjectModel('user') private readonly userModel: Model<User> ){
		super({
			secretOrKey : 'secret',
			jwtForRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
		})
	}

	async validate (payload : string): Promise<User> {
		let userName = payload ;
		let user  = await this.userModel.findOne({userName})
		console.log(user,"<====jwt Strategy")
		if(!user){
			throw new UnauthorizedException();
		}
		return user;
	}
}