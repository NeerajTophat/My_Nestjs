import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
	empName : {type: String},
	empId	: {type: String},
	empSalary : {type: Number},
	picture: Array,
	isDeleted : {type: Number , default: 0}
})

export interface Employee extends mongoose.Document {
	id: string,
	empName: string,
	empId: string,
	empSalary : number,
	picture: [string]
}