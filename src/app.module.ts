import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module'
import { EmployeeModule } from './employee/employee.module'
import { userModule } from './users/user.module'

@Module({
  imports: [
  ProductModule,
  userModule,
  EmployeeModule, 
  MongooseModule.forRoot(
  	'mongodb+srv://neeraj:niru143@cluster0.cf2jj.mongodb.net/NestJs?retryWrites=true&w=majority'
  	),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
