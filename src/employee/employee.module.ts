import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { EmployeeSchema } from './employee.model'
import { MulterModule } from '@nestjs/platform-express';
import { userModule } from '../users/user.module'

@Module({
	imports		: [
		MulterModule.register(),
		MongooseModule.forFeature([{name: "employee", schema: EmployeeSchema}]),
		userModule
	],
	controllers : [EmployeeController],
	providers 	: [EmployeeService]
})


export class EmployeeModule {}