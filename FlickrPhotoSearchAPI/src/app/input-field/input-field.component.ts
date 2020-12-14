import { Component, Input, OnInit } from '@angular/core';
import { FlikrAPIService } from '../flikr-api.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  constructor(private imgApi: FlikrAPIService) { }
  // tslint:disable-next-line:ban-types
  list: [];

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  affiche(e) {
    this.imgApi.getFlikrImg(e.value).subscribe(
      data => {
        console.log(data);
        this.list = data.photos.photo;
      }
    );
  }
}
