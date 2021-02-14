import { Component, OnInit } from '@angular/core';
import { FlickrAPIService } from '../flickr-api.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  list: [];
  tag: String;

  constructor(private imgApi: FlickrAPIService) {}
  ngOnInit(): void {}

  affiche(tag) {
    this.imgApi.getFlickrImg(tag.value).subscribe(
      data => {
        if (data.stat === 'fail') {
          alert('Une erreur de communication avec Flickr est survenue.');
        }
        this.list = data.photos.photo;
        this.tag = tag.value;
      }
    );
  }
}
