import { Controller, Get, Post, Body, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from "@nestjs/platform-express";

class submitDTO {
  restaurantName: string;
  cityName: string;
  file: File;
}

class deleteDTO {
  id : string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  retrieveRestaurantAndCity(): object {
    return this.appService.getData();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  submit(@UploadedFile() file, @Body() data: submitDTO): object {
    return this.appService.postData2(data, file);
  }

  @Delete()
  deleteRestaurant(@Body() data : deleteDTO) : object {
    return this.appService.deleteData(data);
  }
  
}
 