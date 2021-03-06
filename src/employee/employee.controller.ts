import { Controller, Post, Body , Get , UseInterceptors , UploadedFiles, UseGuards} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { Helper } from '../../helper/helper'

import { EmployeeService } from './employee.service'
// import { JwtAuthGuard } from '../jwt-Auth';
import { AuthGuard } from '@nestjs/passport'

@Controller('employees')
export class EmployeeController {
	constructor( private readonly employeeService: EmployeeService ) {}

	// @Post('addEmployee')
	// async addEmployee(

	// 	@Body('empName') EName : string,
	// 	@Body('empId') EId : string,
	// 	@Body('empSalary') ESalary: number
	// 	){
	// 	console.log(EName,"<==========Controller Emp")
	// 	const emps = await this.employeeService.addEmployee(
	// 		EName,
	// 		EId,
	// 		ESalary
	// 		);
	// 	return {data: emps}
	// }

	// @Post('addEmployee')
	//   @UseInterceptors(FileInterceptor('picture', {
 //  	storage: diskStorage({
 //        destination: Helper.destinationPath,
 //        filename: Helper.customFileName,
 //      }), 
 //  }))
	// async addEmployee(
	// 	@UploadedFile() file,
	// 	@Body() completeBody : {empName: string, empId: string, empSalary: number,}

	// 	){
	// 	const emps = await this.employeeService.addEmployee(completeBody,file);
	// 	return {data: emps}
	// }

	@Post('addEmployee')
	  @UseInterceptors(FilesInterceptor('picture',10, {
			storage: diskStorage({
			destination: Helper.destinationPath,
			filename: Helper.customFileName,
      }), 
  }))

	async addEmployee(
		@UploadedFiles() files,
		@Body() completeBody : {empName: string, empId: string, empSalary: number,}

		){
			const response = [];
			files.forEach(file => {
				const fileReponse = {
					originalname: file.originalname,
					filename: file.filename,
					filePath: file.path,
					mimetype: file.mimetype,
					destination: file.destination


				};
				response.push(fileReponse);
			});
		const emps = await this.employeeService.addEmployee(completeBody,response);
		return {data: emps}
	}


	
	@Get('getAllEmployee')
	@UseGuards(AuthGuard())
	async getAllEmployee() {
		return this.employeeService.getAllEmployee()
	}

	@Post('getEmployee')
	async getEmployee(@Body('empId') eId: any) {
		const emp = await this.employeeService.getEmployee(eId)
		return emp

	}

	@Post('updateEmployee')
		  @UseInterceptors(FilesInterceptor('picture',10, {
			storage: diskStorage({
			destination: Helper.destinationPath,
			filename: Helper.customFileName,
      }), 
  }))

	async updateEmployee(
		@UploadedFiles() files,
		@Body('employeeId') employeeId: string,
		@Body('empName') eName : string,
		@Body('empId') eId : string,
		@Body('empSalary') eSalary : number
		) {
			const response = [];
			files.forEach(file => {
				const fileReponse = {
					originalname: file.originalname,
					filename: file.filename,
					filePath: file.path,
					mimetype: file.mimetype,
					destination: file.destination


				};
				response.push(fileReponse);
			});
		const updateEmps = await this.employeeService.updateEmployee(employeeId, eName, eId, eSalary,response)
		return {updateEmps}
	}

	@Post('deleteEmployee')
	async deleteEmployee(@Body('empId') eId: string) {
		const deleteEmp = await this.employeeService.deleteEmployee(eId)
		return(deleteEmp)
	}


}



  // @Post('file-upload')
  // @UseInterceptors(FileInterceptor('picture', {
  // 	storage: diskStorage({
  //       destination: Helper.destinationPath,
  //       filename: Helper.customFileName,
  //     }), 
  // }))

 //  async uploadfile(@UploadedFile() file) {
 //  	// console.log(file,"<========controller")
 //  	// let fileUpload = await this.employeeService.fileUpload(file)
  	
 //    // return {fileUpload};
 //      const response = {
 //    	originalname: file.originalname,
 //    	filename: file.filename,
 //    	filePath: file.path
 //    };
	// let fileUpload = await this.employeeService.fileUpload(file)
 //    console.log(fileUpload,"<=======")
 //       return fileUpload;
 //  }}

