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
  // tslint:disable-next-line:ban-types
  private info: String = '';

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  affiche(e) {
    this.imgApi.getFlikrImg(this.info).subscribe(
      data => {
        console.log(data.stat);
        if (data.stat === 'fail'){
          alert('Image non-trouvé');
        }
        this.list = data.photos.photo;
        this.info = '';
      }
    );
  }

  // tslint:disable-next-line:typedef
  recupInfo(tags: HTMLInputElement, text: HTMLInputElement, geo: HTMLInputElement) {
    if (tags.value !== ''){
      this.info += 'tags=' + tags.value + '&';
    }
    if (text.value !== ''){
      this.info += 'text=' + text.value + '&';
    }
    if (geo.value !== ''){
      this.info += 'has_geo=' + geo.value + '&';
    }
    console.log(this.info);
  }
}
