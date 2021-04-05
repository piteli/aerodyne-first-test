import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';

export interface DialogData {
  image: File;
}

@Component({
  selector: 'app-modal-image-display',
  templateUrl: './modal-image-display.component.html',
  styleUrls: ['./modal-image-display.component.scss']
})
export class ModalImageDisplayComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalImageDisplayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.retrieveImage();
  }

  retrieveImage(){
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#imgshow').attr('src', e.target.result);
    }
    reader.readAsDataURL(this.data.image);
  }

}
