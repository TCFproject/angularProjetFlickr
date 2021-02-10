import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoImageDialogComponent } from '../info-image-dialog/info-image-dialog.component';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.css']
})
export class ButtonFieldComponent implements OnInit {
  @Input() tags;

  passage: number = 0;
  photos = [];
  photosParPage = 5;

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  images(): { lien: string; Id: number }[] {
    this.photos = [];
    if (this.tags.length >= this.photosParPage) {
      for (let i = 0; i < this.photosParPage; i += 1) {
        this.photos.push({
          lien: 'https://live.staticflickr.com/' + this.tags[this.passage + i].server + '/' + this.tags[this.passage + i].id + '_' + this.tags[this.passage + i].secret + '.jpg',
          Id: this.passage + i
        });
      }
      return this.photos;
    } else {
      for (let i = 0; i < this.tags.length; i += 1) {
        this.photos.push({
          lien: 'https://live.staticflickr.com/' + this.tags[i].server + '/' + this.tags[i].id + '_' + this.tags[i].secret + '.jpg',
          Id: i
        });
      }
      return this.photos;
    }
  }

  Dropup() {
    if (this.tags.length >= this.photosParPage) {
      if (this.passage >= this.tags.length - this.photosParPage) {
        this.passage = this.tags.length - this.photosParPage;
      } else {
        this.passage += this.photosParPage;
      }
    }
  }

  Dropdown() {
    if (this.tags.length >= this.photosParPage) {
      if (this.passage <= 0) {
        this.passage = 0;
      } else {
        this.passage -= this.photosParPage;
      }
    }
  }

  ouvrirInfo(info) {
    const dial = this.dialog.open(InfoImageDialogComponent, {data: {infos: info}});
  }
}
