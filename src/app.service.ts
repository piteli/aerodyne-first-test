import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from "mongoose";

@Injectable()
export class AppService {

  constructor(@InjectConnection() private connection: Connection) {}

  async getData(): Promise<object> {
    try{
      const response = await this.connection.collection('restaurants').find().toArray();
      return { success : true, data : response };
    }catch(e){
      return { success : false, message : "An error occurred (500). Please try again later." }
    }
  }

  async postData(data): Promise<object>{
    const new_id = new mongoose.Types.ObjectId();
    try{
      const response = await this.connection.collection('restaurants')
      .insertOne({id : new_id, restaurantName : data.restaurantName, cityName : data.cityName});
      return { success : true };
    }catch(e){
      return { success : false };
    }
  }

  async deleteData(data): Promise<object> {
    try{
      const response = await this.connection.collection('restaurants').findOneAndDelete({id : data.id});
      return { success : true, data : response };
    }catch(e){
      return { success : false, message : "An error occurred (500). Please try again later." }
    }
  }
}
