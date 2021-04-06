import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import firebase from 'firebase';

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
      // const ref = firebase.storage().ref().child('pic');
      // const snapshot = await ref.put(file);
      // const image_url = await snapshot.ref.getDownloadURL();
      const response = await this.connection.collection('restaurants')
      .insert({restaurantName : data.restaurantName, cityName : data.cityName});
      return { success : true, data : response };
    }catch(e){
      return { success : false, message : JSON.stringify(e) };
    }
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
