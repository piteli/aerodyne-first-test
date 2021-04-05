import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-modal-file-upload',
  templateUrl: './modal-file-upload.component.html',
  styleUrls: ['./modal-file-upload.component.scss']
})
export class ModalFileUploadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalFileUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  upload(event){
    const file = event.target.files[0];
    const file_name = file.name;
    // const base64 = await this.toBase64Web(file);
    // const updated_base64 = (base64.split(','))[1];
    // this.saveBase64ToKey(updated_base64, file_name, key);
  }

  onClose(): void {
    this.dialogRef.close();
  }


}
