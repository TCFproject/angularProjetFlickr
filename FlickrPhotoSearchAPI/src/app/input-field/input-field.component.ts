import { Component, OnInit } from '@angular/core';
import { FlikrAPIService } from '../flikr-api.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  constructor(private imgApi: FlikrAPIService) { }
  list: [];
  private info: String = '';

  ngOnInit(): void {}

  affiche(e) {
    this.imgApi.getFlikrImg(e.value).subscribe(
      data => {
        console.log(data.stat);
        if (data.stat === 'fail') {
          alert('Image non-trouvée');
        }
        this.list = data.photos.photo;
        this.info = '';
      }
    );
  }

  recupInfo(tags: HTMLInputElement) {
    if (tags.value !== ''){
      this.info += 'tags=' + tags.value + '&';
    }
    console.log(this.info);
  }
}
