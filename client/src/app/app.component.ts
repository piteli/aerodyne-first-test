import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { ModalFileUploadComponent } from '../components/modal-file-upload/modal-file-upload.component';

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
  file : Blob;

  constructor(private snackBar : MatSnackBar,
              public dialog: MatDialog){}

  ngOnInit(){
    this.setupForm();
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

  showSnackBar(mode){
    this.snackBar.open('Successfully added new Restaurant Directory!', 'Close', {
      duration: 2000,
      panelClass: [mode === 'success' ? 'snackbar-success' : 'snackbar-error']
    });
  }

  onSubmit(){
    const dialogRef = this.dialog.open(ModalFileUploadComponent, {
      width: '250px',
      data: {file: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.file = result;
      this.submit();
    });
  }

  submit = () => {
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

  delete(id){
    const findIndex = this.listData.findIndex(c => c.id === id);
    const findIndex2 = this.collectionData.findIndex(c => c.id === id);
    this.listData.splice(findIndex, 1);
    this.collectionData.splice(findIndex2, 1);
  }

  resultAdd = (payload) => {
    //finisher
    this.listData.push({ id: this.collectionData.length ,restaurantName : payload.restaurantName, cityName : payload.cityName});
    this.collectionData.push({ id: this.collectionData.length ,restaurantName : payload.restaurantName, cityName : payload.cityName});
    this.form.reset();
    this.showSnackBar('success');
    this.toggleLoadingBtn();
  }
}
