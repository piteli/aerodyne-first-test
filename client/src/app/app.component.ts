import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { ModalFileUploadComponent } from '../components/modal-file-upload/modal-file-upload.component';
import { ModalImageDisplayComponent } from '../components/modal-image-display/modal-image-display.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  form: FormGroup;
  showSpinnerBtn: boolean = false;
  listData = [];
  collectionData = [];
  file : File;

  constructor(private snackBar : MatSnackBar,
              public dialog: MatDialog){}

  ngOnInit(){
    this.setupForm();
    this.loadRestaurantAndCityData();
  }

  async loadRestaurantAndCityData(){
    console.log('wee');
    try{
      const response = await fetch('http://localhost:5000', {method : 'get'});
      const json = await response.json();
      if(!json.success) { this.showSnackBar('No Restaurant Records exist', 'danger'); return; }
      let collection = [];
      for(let item of json.data) 
      { collection.push({id : item._id, restaurantName : item.restaurantName, cityName : item.cityName}) }
      this.listData = collection;
      this.collectionData = collection;
    }catch(e){
      console.log(JSON.stringify(e));
    }
  }

  setupForm(){
    this.form = new FormGroup({
      restaurantName : new FormControl('', {
        updateOn : 'change',
        validators : [Validators.required]
      }),
      cityName : new FormControl('', {
        updateOn : 'change',
        validators : [Validators.required]
      })
    });
  }

  toggleLoadingBtn(){
    this.showSpinnerBtn = !this.showSpinnerBtn;
  }

  showSnackBar( message, mode){
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: [mode === 'success' ? 'snackbar-success' : 'snackbar-error']
    });
  }

  onSubmit(){
    const dialogRef = this.dialog.open(ModalFileUploadComponent, {
      width: '250px',
      data: {file: "", submit : false}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('here is a result', result);
      if(result.submit){
        this.file = result.file;
        this.submit();
      }
    });
  }

  submit = async() => {
    this.toggleLoadingBtn();
    let payload = this.form.value;
    let formData = new FormData();
    formData.append('restaurantName', payload.restaurantName);
    formData.append('cityName', payload.cityName);
    formData.append('file', this.file);
    try{
      const response = await fetch('http://localhost:5000', 
                    {method : 'post', body : formData, headers : {'Content-Type' : 'multipart/form-data'}});
      const json = await response.json();
      payload['id'] = json['data']['insertedIds']['0'];
      this.resultAdd(payload);
    }catch(e){
      this.showSnackBar(JSON.stringify(e), 'danger');
      this.toggleLoadingBtn();
    }
    ///////////

  }

  search(event){
    const value = event.target.value;

    let collection = [];
    const data = this.collectionData;

    if(value === ''){
        this.listData = data; return;
    }
    for(let item of data){
        for(let key in item){
            if(((item[key]).toString()).indexOf(value) > -1){
              collection.push(item); 
              break;
            }
        }
    }
    console.log(collection);
    this.listData = collection;
  }

  async delete(id){
    try{
      let formData = new FormData();
      formData.append('id', id);
      const response = await fetch('http://localhost:5000', 
                    {method : 'delete', body : formData, headers : {'Content-Type' : 'multipart/form-data'}});
      const json = await response.json();
      const findIndex = this.listData.findIndex(c => c.id === id);
      const findIndex2 = this.collectionData.findIndex(c => c.id === id);
      this.listData.splice(findIndex, 1);
      this.collectionData.splice(findIndex2, 1);
    }catch(e){
      this.showSnackBar('An error occurred. Please try again later', 'danger');
    }
  }

  resultAdd = (payload) => {
    //finisher
    this.listData.push({ id: payload.id ,restaurantName : payload.restaurantName, cityName : payload.cityName, image : this.file});
    this.collectionData.push({ id: payload.id ,restaurantName : payload.restaurantName, cityName : payload.cityName, image : this.file});
    this.form.reset();
    this.showSnackBar('Successfully added new Restaurant Directory!', 'success');
    this.toggleLoadingBtn();
    this.file = null;
  }

  viewImage(image){
    if(image == undefined || image == null){
      this.showSnackBar('No Image uploaded', 'danger');
      return;
    }

    this.dialog.open(ModalImageDisplayComponent, {
      width: '250px',
      data : { image }
    });
  }
}
