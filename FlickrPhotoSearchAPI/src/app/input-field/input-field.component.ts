import { Component, Input, OnInit } from '@angular/core';
import { FlikrAPIService } from '../flikr-api.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  constructor(private imgApi: FlikrAPIService) { }
  list: [];

  ngOnInit(): void {
  }

  affiche(e) {
    this.imgApi.getFlikrImg(e.value).subscribe(
      data => {
        console.log(data);
        this.list = data.photos.photo;
      }
    );
  }
}
