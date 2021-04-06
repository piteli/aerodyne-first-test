import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDXvLWpE1Tsqyy50wtxSvp4DEavQa2vdeo",
  authDomain: "breakpoint-d0d86.firebaseapp.com",
  databaseURL: "https://breakpoint-d0d86.firebaseio.com",
  projectId: "breakpoint-d0d86",
  storageBucket: "breakpoint-d0d86.appspot.com",
  messagingSenderId: "357396356087",
  appId: "1:357396356087:web:d30dc5a281bc0bbe2eecf2",
  measurementId: "G-D8T77NYCGG"
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
