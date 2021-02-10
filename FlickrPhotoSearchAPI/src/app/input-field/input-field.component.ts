import { Component, OnInit } from '@angular/core';
import { FlickrAPIService } from '../flickr-api.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  list: [];

  constructor(private imgApi: FlickrAPIService) {}
  ngOnInit(): void {}

  affiche(tag) {
    this.imgApi.getFlickrImg(tag.value).subscribe(
      data => {
        if (data.stat === 'fail') {
          alert('Image non-trouvée');
        }
        this.list = data.photos.photo;
      }
    );
  }
}
