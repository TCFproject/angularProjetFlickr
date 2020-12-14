import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FlikrAPIService} from '../flikr-api.service';

@Component({
  selector: 'app-info-image-dialog',
  templateUrl: './info-image-dialog.component.html',
  styleUrls: ['./info-image-dialog.component.css']
})
export class InfoImageDialogComponent implements OnInit {

  constructor(private imgApi: FlikrAPIService, @Inject(MAT_DIALOG_DATA) public data: {infos: object}) { }

  Auteur: string;
  Titre: string;
  dateposter: string;
  dateupload: string;

  donnee = this.data.infos;
  ngOnInit(): void {
    // @ts-ignore
    this.imgApi.getFlikrInfo(this.donnee.id).subscribe(data => {
      console.log(data.photo);
      this.Auteur = data.photo.owner.username;
      this.dateupload = data.photo.dateuploaded;
      this.dateposter = data.photo.dates.posted;
      this.Titre = data.photo.title._content;
    });
  }

}
