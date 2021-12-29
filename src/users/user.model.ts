import * as mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
	userName: {type: String, required: true},
	email : {type: String, required: true},
	password: {type: String, required: true},
	mobileNumber: {type: Number, required: true},
	isDeleted : {type: Number, default: 0}

},{
	timestamps: true
})

export interface User extends mongoose.Document {
	id: string,
	userName: string,
	email: string,
	password : string,
	mobileNumber: number
}