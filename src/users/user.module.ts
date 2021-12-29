import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { userController } from './user.controller'
import { userService } from './user.service'
import { userSchema } from './user.model'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		MongooseModule.forFeature([{name: 'user', schema : userSchema }]),
		PassportModule.register({defaultStrategy: 'jwt'}) ,
		JwtModule.register({
			secret: 'secret',
      		signOptions: { expiresIn: '1d' },
      })
	],
	controllers: [userController],
	providers:[userService, JwtStrategy ],
	exports: [ JwtStrategy, PassportModule]
}) 


export class userModule {}