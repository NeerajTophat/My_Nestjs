import { Injectable , NotFoundException } from '@nestjs/common';
import { Product } from './product.model'
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()

export class ProductService {

	private products: Product[] = [];

	constructor(
		@InjectModel('product') private readonly productModel : Model<Product> 
		) {}

	async insertProduct(title: string, description: string, price: number) {
		const prodId =Math.random().toString();
		const newProduct = new this.productModel({title: title, description: description, price: price});
		this.products.push(newProduct)
		const result = await newProduct.save()
		console.log(result,"<=========result")
		return result;
	}

	async getProducts() {
		const products = await this.productModel.find()
		return {status: 1, "message":" product Find Successfully", data: products };
	}

	async getSingleProduct(productId: string) {
		let product = await this.productModel.findById(productId)
		return {status: 1, "message":" product Find Successfully", data: product };
	}

	async updateProduct(productId: string, title: string, description: string, price: number ) {
		let updatedProduct = await this.productModel.findById(productId)
		if(title){
			updatedProduct.title = title
		}
		if(description){
			updatedProduct.description = description
		}
		if(price){
			updatedProduct.price = price
		}
		let result = await updatedProduct.save();
		return result;

	}

	async deleteProduct(productId: string){
		let updatedProduct = await this.productModel.findByIdAndRemove(productId)
		
		return {status: 1, "message": " Product Deleted Success"}

	}

	private findProduct(id : string): [Product, number] {
		const productIndex = this.products.findIndex((prod) => prod.id === id);
		const product = this.products[productIndex]
		if(!product){
			throw new NotFoundException("Product Not Found !");
		}
		return [product, productIndex];
	}
}