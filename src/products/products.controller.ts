import { Controller, Post, Body, Get , Param , Patch, Delete} from '@nestjs/common';

import { ProductService } from './products.service'

@Controller('products')


export class ProductController {
	constructor(private readonly productService : ProductService) {}


	@Post()
	async addProduct(
		@Body('title') prodTitle: string, 
		@Body('description') prodDescription: string, 
		@Body('price') prodPrice : number
		) {
		    const id = await this.productService.insertProduct(
		    	prodTitle, 
		    	prodDescription, 
		    	prodPrice
		    	);
		    return{ id: id }
	}

	@Get()
	getAllProducts() {
		return this.productService.getProducts();
	}

	@Get(':id')
	getProduct(@Param('id') prodId : string) {
		return this.productService.getSingleProduct(prodId);
	}

	@Patch(':id')
	updateProduct(
		@Param('id') prodId : string,
		@Body('title') prodTitle : string,
		@Body("description") prodDescription : string,
		@Body('price') prodPrice : number

		 ) {

		const updatedProd = this.productService.updateProduct(
			prodId,
			prodTitle,
			prodDescription,
			prodPrice
			);
		return updatedProd;

	}
  
	@Delete(':id')
	deleteProduct(@Param('id') prodId : string) {
		return this.productService.deleteProduct(prodId)
	}
}