import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ButtonFieldComponent } from './button-field/button-field.component';
import { ImagesLayoutComponent } from './images-layout/images-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    ButtonFieldComponent,
    ImagesLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
