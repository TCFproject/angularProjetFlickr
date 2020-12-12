import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Moteur de recherche de photos avec l\'API Flickr';
  tags = "";

  reception(event) {
    this.tags = event;
    console.log(this.tags);
  }
}
