import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  inputText: string = "";
  @Output() envoiVersParent = new EventEmitter<string>();

  constructor() {}
  ngOnInit(): void {}

  textChange() {
    this.envoiVersParent.emit(this.inputText);
  }
}
