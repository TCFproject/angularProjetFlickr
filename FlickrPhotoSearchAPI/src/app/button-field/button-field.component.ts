import { Component, Input, OnInit } from '@angular/core';
import { FlikrAPIService } from '../flikr-api.service';
import { MatDialog } from '@angular/material/dialog';
import {InfoImageDialogComponent} from '../info-image-dialog/info-image-dialog.component';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.css']
})
export class ButtonFieldComponent implements OnInit {
    @Input() Tags;

    constructor(private imgApi: FlikrAPIService, private dialog: MatDialog) { }
    donnee: any[];
    passage = 0;
    ngOnInit(): void {
        this.imgApi.getFlikrImg('nature').subscribe(
            data => {
                this.donnee = data.photos.photo;
            }
        );
    }
  test(): { lien: string; Id: number }[] {return [
    // tslint:disable-next-line:max-line-length
    {lien: 'https://live.staticflickr.com/' + this.Tags[this.passage].server + '/' + this.Tags[this.passage].id + '_' + this.Tags[this.passage].secret + '.jpg', Id: this.passage},
    // tslint:disable-next-line:max-line-length
    {lien: 'https://live.staticflickr.com/' + this.Tags[this.passage + 1].server + '/' + this.Tags[this.passage + 1].id + '_' + this.Tags[this.passage + 1].secret + '.jpg', Id: this.passage + 1},
    // tslint:disable-next-line:max-line-length
    {lien: 'https://live.staticflickr.com/' + this.Tags[this.passage + 2].server + '/' + this.Tags[this.passage + 2].id + '_' + this.Tags[this.passage + 2].secret + '.jpg', Id: this.passage + 2},
    // tslint:disable-next-line:max-line-length
    {lien: 'https://live.staticflickr.com/' + this.Tags[this.passage + 3].server + '/' + this.Tags[this.passage + 3].id + '_' + this.Tags[this.passage + 3].secret + '.jpg', Id: this.passage + 3},
    // tslint:disable-next-line:max-line-length
    {lien: 'https://live.staticflickr.com/' + this.Tags[this.passage + 4].server + '/' + this.Tags[this.passage + 4].id + '_' + this.Tags[this.passage + 4].secret + '.jpg', Id: this.passage + 4} ]; }

  // tslint:disable-next-line:typedef
  Dropup() {
    // @ts-ignore
    if (this.passage >= this.donnee.length - 5){
      this.passage = this.donnee.length - 5;
    }else {
      this.passage++;
    }
  }

  // tslint:disable-next-line:typedef
  Dropdown() {
    // @ts-ignore
    if (this.passage === 0){
      this.passage = 0;
    }else {
      this.passage--;
    }
  }
  // tslint:disable-next-line:typedef
  ouvrirInfo(info) {
      const dial = this.dialog.open(InfoImageDialogComponent, {data: {infos: info}});
  }
}
