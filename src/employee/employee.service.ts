import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Employee } from './employee.model'
import { Model } from 'mongoose'

@Injectable()

export class EmployeeService {
	constructor(
		@InjectModel('employee') private readonly employeeModel : Model<Employee>
		){}

	async addEmployee(completeBody:{empName: string, empId: string, empSalary: number},file){
		console.log(completeBody,"<========empName")
		const newEmp = new this.employeeModel({empName: completeBody.empName, empId: completeBody.empId, empSalary: completeBody.empSalary,picture: file})

		const result = await newEmp.save()
		console.log(result, "<======result")
		if(result){
		return {status: 1, message: "Employee Add Success", data: result}
		}
		return {status: 0, message: "Try Again", data: {}}
	}
async getAllEmployee(){
	let allEmp = await this.employeeModel.find({isDeleted: 0});
	if(allEmp){
		return {status: 1, message: "Employee Find Success", data: allEmp}
		}
		return {status: 0, message: "Try Again", data: {}}
}

async getEmployee(id: string){
	let getEmployee = await this.employeeModel.findById({id, isDeleted: 0})
	if(getEmployee){
		return {status: 1, message: "Employee Find Success", data: getEmployee}
		}
		return {status: 0, message: "Try Again", data: {}}

}

async updateEmployee(id:string, empName: string, empId: string, empSalary: number){
	let updatedEmp = await this.employeeModel.findByIdAndUpdate({_id: id,isDeleted: 0},{
		empName: empName,
		empId: empId,
		empSalary: empSalary
	})
	if(updatedEmp){
		return {status: 1, message: "Employee Update Success", data: updatedEmp}
		}
		return {status: 0, message: "Try Again", data: {}}
}

async deleteEmployee(id: string) {
	let deleteEmp = await this.employeeModel.findByIdAndUpdate({_id: id},{isDeleted: 1})
	if(deleteEmp){
		return {status: 1, message: "Employee Delete Success"}
		}
		return {status: 0, message: "Try Again", data: {}}
}

async fileUpload(file){
	console.log(file,"<==============Service")
	let uplodedFile = await this.employeeModel.create({picture:file})
	if(uplodedFile){
		return {status: 1, message: "Employee Delete Success", data:uplodedFile}
		}
		return {status: 0, message: "Try Again", data: {}}

}


}