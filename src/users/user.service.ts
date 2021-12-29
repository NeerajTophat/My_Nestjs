import { Injectable, Res } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

import { User } from './user.model'
import { Model } from 'mongoose'


@Injectable()
export class userService {
	constructor( @InjectModel('user') private readonly userModel: Model<User> ,private jwtService: JwtService){}

	async signUp(completeBody: {userName: string, email: string, mobileNumber: number},hash){
		let users = await this.userModel.findOne({ email: completeBody.email })
		if(users){
			return {status: 1, message: 'Email Already Registered'}
		}
		let user = await this.userModel.create({userName: completeBody.userName, password: hash, email: completeBody.email, mobileNumber: completeBody.mobileNumber})
		if(user){
			return {status: 1, message: 'User Sign Up Success'}
		}
		return {status: 0, message: 'Try Again'}
	}

	async logIn(completeBody: {email: string , password}){

		return await this.userModel.findOne({email: completeBody.email})

	}
}