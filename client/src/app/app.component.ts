import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  form: FormGroup;
  showSpinnerBtn: boolean = false;
  listData = [{ id: 0, restaurantName : 'value1', cityName : 'value2' }];
  collectionData = [];

  constructor(private snackBar : MatSnackBar){}

  ngOnInit(){
    this.setupForm();
  }

  setupForm(){
    this.form = new FormGroup({
      restaurantName : new FormControl('', {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      cityName : new FormControl('', {
        updateOn : 'blur',
        validators : [Validators.required]
      })
    });
  }

  toggleLoadingBtn(){
    this.showSpinnerBtn = !this.showSpinnerBtn;
  }

  showSnackBar(mode){
    this.snackBar.open('Successfully added new Restaurant Directory!', 'Close', {
      duration: 2000,
      panelClass: [mode === 'success' ? 'snackbar-success' : 'snackbar-error']
    });
  }

  submit(){
    let payload = this.form.value;
    this.toggleLoadingBtn();

    //process
    setTimeout(() => {
      this.resultAdd(payload);
    }, 3000);
    ///////////

  }

  search(event){
    const value = event.target.value;
    console.log(value);

    let collection = [];
    const data = this.listData;
    this.collectionData = data;

    if(value === ''){
        this.setState({commentsData : this.collectionComments}); return;
    }
    for(let item of data){
        for(let key in item){
            console.log(item);
            console.log('lala');
            console.log(item[key]);
            if(((item[key]).toString()).indexOf(value) > -1) collection.push(item); continue;
        }
    }
    console.log(this.collectionComments);
    this.setState({commentsData : collection});
  }

  delete(id){
    const findIndex = this.listData.findIndex(c => c.id === id);
    this.listData.splice(findIndex, 1);
  }

  resultAdd = (payload) => {
    //finisher
    this.listData.push({ id: this.listData.length ,restaurantName : payload.restaurantName, cityName : payload.cityName});
    this.form.reset();
    this.showSnackBar('success');
    this.toggleLoadingBtn();
  }
}
