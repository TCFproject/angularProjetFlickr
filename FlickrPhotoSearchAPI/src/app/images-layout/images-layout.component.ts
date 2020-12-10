import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service'

@Component({
  selector: 'app-images-layout',
  templateUrl: './images-layout.component.html',
  styleUrls: ['./images-layout.component.css']
})
export class ImagesLayoutComponent implements OnInit {

  images = {};

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.imagesService.getJson().subscribe(
      data => {
        this.images = data;
      }
    );
  }

}
