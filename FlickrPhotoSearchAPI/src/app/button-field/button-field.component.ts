import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoImageDialogComponent } from '../info-image-dialog/info-image-dialog.component';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.css']
})
export class ButtonFieldComponent implements OnInit {
  @Input() photosArray;

  numeroDePhoto: number = 0;
  photos = [];
  photosParPage = 3;

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  numeroDePage() {
    return Math.ceil((this.numeroDePhoto / this.photosParPage) + 1);
  }

  nombreDePages() {
    return Math.ceil(this.photosArray.length / this.photosParPage);
  }

  images(): { lien: string; Id: number }[] {
    this.photos = [];
    if (this.photosArray.length >= this.photosParPage) {
      for (let i = 0; i < this.photosParPage; i += 1) {
        this.photos.push({
          lien: 'https://live.staticflickr.com/' + this.photosArray[this.numeroDePhoto + i].server + '/' + this.photosArray[this.numeroDePhoto + i].id + '_' + this.photosArray[this.numeroDePhoto + i].secret + '.jpg',
          Id: this.numeroDePhoto + i
        });
      }
      return this.photos;
    } else {
      for (let i = 0; i < this.photosArray.length; i += 1) {
        this.photos.push({
          lien: 'https://live.staticflickr.com/' + this.photosArray[i].server + '/' + this.photosArray[i].id + '_' + this.photosArray[i].secret + '.jpg',
          Id: i
        });
      }
      return this.photos;
    }
  }

  Dropup() {
    if (this.photosArray.length >= this.photosParPage) {
      if (this.photosArray.length % 2 === 0) {
        if (this.numeroDePhoto >= this.photosArray.length - this.photosParPage) {
          this.numeroDePhoto = this.photosArray.length - this.photosParPage;
        } else {
          this.numeroDePhoto += this.photosParPage;
        }
      } else {

      }
    }
  }

  Dropdown() {
    if (this.photosArray.length >= this.photosParPage) {
      if (this.numeroDePhoto <= 0) {
        this.numeroDePhoto = 0;
      } else {
        this.numeroDePhoto -= this.photosParPage;
      }
    }
  }

  ouvrirInfo(info) {
    const dial = this.dialog.open(InfoImageDialogComponent, {data: {infos: info}});
  }
}
