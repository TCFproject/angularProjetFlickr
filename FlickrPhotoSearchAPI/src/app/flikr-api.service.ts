import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { merge, Observable, of, zip } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { mongo } from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class FlikrAPIService {

  constructor(private http: HttpClient) { }

  api_key: string = '85c28192e81cebde0c340b066b67b2c5';
  NODEJS: string = "http://localhost:7000/images";
  httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  photosInfos = ['swag', 'askip'];
  images = ['1', '42'];
  auteurs = ['pareil', 'test'];
  titres = ['titre', 'véhicule'];
  datespost = ['12/024', '18276'];

  getFlikrImg(tag): Observable<any> {
    let apiUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.api_key + '&tags=' + tag + '&format=json&nojsoncallback=1';
    return this.http.get(this.NODEJS + "/" + tag).pipe(mergeMap(
      (result) => {
        if (Object.keys(result).length === 0) {
          return this.http.get(apiUrl)
                          .pipe(
                            mergeMap(
                              (getResult) => {
                                const getResultObservable = of(getResult);
                                const postObservable = this.http.post(this.NODEJS, { 
                                  "tag": tag,
                                  "photos": this.images,
                                  "auteurs": this.auteurs,
                                  "titres": this.titres,
                                  "datespost": this.datespost
                                }, {headers: this.httpHeaders});
                                return zip(
                                  getResultObservable,
                                  postObservable,
                                );
                              }
                            )
                          );
        } else {
          return of(result);
        }
      }
    ));
  }

  getFlikrInfo(photo_id): Observable<any> {
    return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + this.api_key + '&photo_id=' + photo_id + '&format=json&nojsoncallback=1');
  }
}
