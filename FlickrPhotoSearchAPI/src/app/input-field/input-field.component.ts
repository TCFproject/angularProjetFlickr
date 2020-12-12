import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  inputSearch: string = "";
  @Output() outputText = new EventEmitter<string>();
  
  constructor() {}
  ngOnInit(): void {}

  change() {
    this.outputText.emit(this.inputSearch);
  }
}
