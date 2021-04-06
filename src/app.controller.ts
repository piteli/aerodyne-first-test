import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { AppService } from './app.service';

class submitDTO {
  restaurantName: string;
  cityName: number;
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
  submit(@Body() data: submitDTO): object {
    return this.appService.postData(data);
  }

  @Delete()
  deleteRestaurant(@Body() data : deleteDTO) : object {
    return this.appService.deleteData(data);
  }
  
}
 