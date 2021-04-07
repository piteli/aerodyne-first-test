import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import * as admin from 'firebase-admin';

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

  async postData(data, file): Promise<object>{
    try{
      const response = await this.connection.collection('restaurants')
      .insert({restaurantName : data.restaurantName, cityName : data.cityName});
      return { success : true, data : response };
    }catch(e){
      return { success : false, message : JSON.stringify(e) };
    }
  }

  postData2(data, file): any{
      
    /* Using Firebase Admin SDK */
    
    const bucket = admin.storage().bucket('restaurants');
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('finish', async() => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const response = await this.connection.collection('restaurants')
        .insert({restaurantName : data.restaurantName, cityName : data.cityName, image : publicUrl});
    });

    blobStream.end(file.buffer);
  }

  async deleteData(data): Promise<object> {
    try{
      const response = await this.connection.collection('restaurants').findOneAndDelete({_id : data.id});
      return { success : true, data : response };
    }catch(e){3
      return { success : false, message : "An error occurred (500). Please try again later." }
    }
  }
}
