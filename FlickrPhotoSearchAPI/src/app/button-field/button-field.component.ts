import { Component, Input, OnInit } from '@angular/core';
import { FlikrAPIService } from '../flikr-api.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoImageDialogComponent } from '../info-image-dialog/info-image-dialog.component';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.css']
})
export class ButtonFieldComponent implements OnInit {
  @Input() tags;

  constructor(private imgApi: FlikrAPIService, private dialog: MatDialog) { }
  donnee: any[];
  passage = 0;

  ngOnInit(): void {}

  images(): { lien: string; Id: number }[] { 
    return [
      {lien: 'https://live.staticflickr.com/' + this.tags[this.passage].server + '/' + this.tags[this.passage].id + '_' + this.tags[this.passage].secret + '.jpg', Id: this.passage},
      {lien: 'https://live.staticflickr.com/' + this.tags[this.passage + 1].server + '/' + this.tags[this.passage + 1].id + '_' + this.tags[this.passage + 1].secret + '.jpg', Id: this.passage + 1},
      {lien: 'https://live.staticflickr.com/' + this.tags[this.passage + 2].server + '/' + this.tags[this.passage + 2].id + '_' + this.tags[this.passage + 2].secret + '.jpg', Id: this.passage + 2},
      {lien: 'https://live.staticflickr.com/' + this.tags[this.passage + 3].server + '/' + this.tags[this.passage + 3].id + '_' + this.tags[this.passage + 3].secret + '.jpg', Id: this.passage + 3},
      {lien: 'https://live.staticflickr.com/' + this.tags[this.passage + 4].server + '/' + this.tags[this.passage + 4].id + '_' + this.tags[this.passage + 4].secret + '.jpg', Id: this.passage + 4} 
    ]; 
  }

  Dropup() {
    if (this.passage >= this.donnee.length - 5) {
      this.passage = this.donnee.length - 5;
    } else {
      this.passage += 5;
    }
  }

  Dropdown() {
    if (this.passage === 0) {
      this.passage = 0;
    } else {
      this.passage -= 5;
    }
  }

  ouvrirInfo(info) {
      const dial = this.dialog.open(InfoImageDialogComponent, {data: {infos: info}});
  }
}
