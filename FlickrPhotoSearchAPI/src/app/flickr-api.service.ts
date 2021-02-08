import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// type FlickrResponse = { photos: { photo: {} } };

@Injectable({
  providedIn: 'root'
})
export class FlickrAPIService {

  constructor(private http: HttpClient) { }

  api_key: string = 'e3ec972c03734ea369c37f2d382f6ed8';
  NODEJS: string = "http://localhost:7000/images";
  httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  photosInfos = [];
  auteurs = [];
  titres = [];
  datespost = [];

  getFlickrImg(tag: string): Observable<any> {
    let apiUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.api_key + '&tags=' + tag + '&format=json&nojsoncallback=1';
    return this.http.get(this.NODEJS + "/" + tag.toLowerCase()).pipe(
      mergeMap(
        (result) => {
          if (Object.keys(result).length === 0) {
            return this.http.get(apiUrl)
              .pipe(
                mergeMap(
                  (getResult: any) => {
                    // TODO : getFlickrInfo pour le post
                    this.http.post(this.NODEJS, { 
                      "tag": tag,
                      "photos": getResult.photos.photo,
                      "auteurs": this.auteurs,
                      "titres": this.titres,
                      "datespost": this.datespost
                    }, {headers: this.httpHeaders}).subscribe();
                    // console.log(getResult);
                    return of(getResult);
                  }
                )
              );
          } else {
            return of(result[0]);
          }
        }
      )
    );
  }

  getFlickrInfo(photo_id): Observable<any> {
    return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + this.api_key + '&photo_id=' + photo_id + '&format=json&nojsoncallback=1');
  }
}
