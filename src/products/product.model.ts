import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
	title : {type : String },
	description : {type : String },
	price : {type : Number }
})


export interface Product extends mongoose.Document {
		 id: string;
		 title: string; 
		 description: string;
		 price: number
}