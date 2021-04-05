import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  submitRestaurantAndDirectory(): any{
    
  }
}
