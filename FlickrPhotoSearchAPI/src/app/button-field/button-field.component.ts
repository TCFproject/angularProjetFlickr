import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.css']
})
export class ButtonFieldComponent implements OnInit {
  @Input() tags: string;

  constructor() {}
  ngOnInit(): void {}

  rechercher() {
    alert(this.tags);
  }
}
