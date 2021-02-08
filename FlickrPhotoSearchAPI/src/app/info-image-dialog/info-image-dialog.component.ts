import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlickrAPIService } from '../flickr-api.service';

@Component({
  selector: 'app-info-image-dialog',
  templateUrl: './info-image-dialog.component.html',
  styleUrls: ['./info-image-dialog.component.css']
})
export class InfoImageDialogComponent implements OnInit {

  constructor(
    private imgApi: 
      FlickrAPIService, 
      @Inject(MAT_DIALOG_DATA) public data: { infos: object }
  ) { }

  auteur: string;
  titre: string;
  datepost: string;

  infos = this.data.infos;
  ngOnInit(): void {
    // @ts-ignore
    this.imgApi.getFlickrInfo(this.infos.id).subscribe(data => {
      this.auteur = data.photo.owner.username;
      this.titre = data.photo.title._content;
      this.datepost = new Date(data.photo.dates.posted * 1000).toLocaleDateString("fr-FR");
    });
  }

}
