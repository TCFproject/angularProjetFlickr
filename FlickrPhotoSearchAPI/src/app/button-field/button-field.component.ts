import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.css']
})
export class ButtonFieldComponent implements OnInit {
  
  tags = "";

  constructor() { }

  ngOnInit(): void {
  }

  rechercher(input: string) {
    this.tags += input;
    alert(this.tags);
    // this.tags.emit(tags);
  }
}
