import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  file: string;
  submit : boolean;
}

@Component({
  selector: 'app-modal-file-upload',
  templateUrl: './modal-file-upload.component.html',
  styleUrls: ['./modal-file-upload.component.scss']
})
export class ModalFileUploadComponent implements OnInit {

  file : any;
  file_name:string;

  constructor(public dialogRef: MatDialogRef<ModalFileUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  upload(event){
    this.file = event.target.files[0];
    this.file_name = this.file.name;
    // const base64 = await this.toBase64Web(file);
    // const updated_base64 =                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             (base64.split(','))[1];
    // this.saveBase64ToKey(updated_base64, file_name, key);
  }

  successReturn(){
    return {
      file : this.file,
      file_name : this.file_name,
      submit : true
    }
  }

  failedReturn(){
    return {
      submit : false
    }
  }

}
