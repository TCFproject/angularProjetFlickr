import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoImageDialogComponent } from '../info-image-dialog/info-image-dialog.component';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.css']
})
export class ButtonFieldComponent implements OnInit {
  @Input() photosArray;

  numeroDePhoto: number = 0;
  photos = [];
  photosParPage = 13;

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  numeroDePage() {
    return Math.ceil((this.numeroDePhoto / this.photosParPage) + 1);
  }

  nombreDePages() {
    return Math.ceil(this.photosArray.length / this.photosParPage);
  }

  reste() {
    return this.photosArray.length % this.photosParPage;
  }

  images(): { lien: string; Id: number }[] {
    this.photos = [];
    // soit n le nombre de photos (max. 100)
    // n >= nombre de photos par page
    if (this.photosArray.length >= this.photosParPage) {
      // la dernière page de photos est remplie 
      if (this.photosArray.length % this.photosParPage === 0) {
        // on affiche via this.photos[] les i images (i étant le nombre de photos par page) en commençant par l'index actuel 
        for (let i = 0; i < this.photosParPage; i += 1) {
          this.photos.push({
            lien: 'https://live.staticflickr.com/' + this.photosArray[this.numeroDePhoto + i].server + '/' + this.photosArray[this.numeroDePhoto + i].id + '_' + this.photosArray[this.numeroDePhoto + i].secret + '.jpg',
            Id: this.numeroDePhoto + i
          });
        }
      // la dernière page de photos n'est pas remplie
      } else {
        // l'index de la photo n'est pas sur la dernière page
        if (this.numeroDePhoto < this.photosArray.length - this.photosParPage) {
          for (let i = 0; i < this.photosParPage; i += 1) {
            this.photos.push({
              lien: 'https://live.staticflickr.com/' + this.photosArray[this.numeroDePhoto + i].server + '/' + this.photosArray[this.numeroDePhoto + i].id + '_' + this.photosArray[this.numeroDePhoto + i].secret + '.jpg',
              Id: this.numeroDePhoto + i
            });
          }
        // l'index de la photo est sur la dernière page
        } else {
          for (let i = 0; i < this.reste(); i += 1) {
            this.photos.push({
              lien: 'https://live.staticflickr.com/' + this.photosArray[this.numeroDePhoto + i].server + '/' + this.photosArray[this.numeroDePhoto + i].id + '_' + this.photosArray[this.numeroDePhoto + i].secret + '.jpg',
              Id: this.numeroDePhoto + i
            });
          }
        }
      }
    // n < nombre de photos par page
    } else {
      // on boucle jusqu'à n-1
      for (let i = 0; i < this.photosArray.length; i += 1) {
        this.photos.push({
          lien: 'https://live.staticflickr.com/' + this.photosArray[i].server + '/' + this.photosArray[i].id + '_' + this.photosArray[i].secret + '.jpg',
          Id: i
        });
      }
    }
    return this.photos;
  }

  Dropup() {
    if (this.photosArray.length >= this.photosParPage) {
      // la dernière page de photos est remplie
      if (this.photosArray.length % this.photosParPage === 0) {
        // on incrémente du nombre de photos par page ou on laisse à n-nb photos par page
        if (this.numeroDePhoto < this.photosArray.length - this.photosParPage) {
          this.numeroDePhoto += this.photosParPage;
        } else {
          this.numeroDePhoto = this.photosArray.length - this.photosParPage;
        }
      // la dernière page de photos n'est pas remplie
      } else {
        // on incrémente du nombre de photos par page ou on laisse à n-le reste de photos 
        if (this.numeroDePhoto < this.photosArray.length - this.photosParPage) {
          this.numeroDePhoto += this.photosParPage;
        } else {
          this.numeroDePhoto = this.photosArray.length - (this.photosArray.length % this.photosParPage);
        }
      }
    }
  }

  Dropdown() {
    if (this.photosArray.length >= this.photosParPage) {
      if (this.numeroDePhoto <= 0) {
        this.numeroDePhoto = 0;
      } else {
        this.numeroDePhoto -= this.photosParPage;
      }
    }
  }

  ouvrirInfo(info) {
    const dial = this.dialog.open(InfoImageDialogComponent, {data: {infos: info}});
  }
}
