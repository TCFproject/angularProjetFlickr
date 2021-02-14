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

  api_key: string = '7d3de17b9c43cd99c2c7372650bb502e';
  NODEJS: string = "http://localhost:7000/images";
  httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  getFlickrImg(tag: string): Observable<any> {
    let apiUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.api_key + '&tags=' + tag + '&format=json&nojsoncallback=1';
    /**
     * pour permettre la recherche avec plusieurs tags, il faut remplacer les virgules par leur code ASCII dans l'url, %2C 
     * mais trop compliqué de mettre en base les recherches qui ont plusieurs tags 
     * tout en différenciant les recherches qui ne contiennent qu'un seul tag étant donné 
     * qu'on peut ne pas avoir les mêmes photos en recherchant avec un seul tag et  
     * en recherchant avec plusieurs tags 
     */
    // let tagFormat = tag.split(/[ ,]+/).join('%2C');
    tag = tag.match(/[a-zA-Z0-9]+/)[0];
    return this.http.get(this.NODEJS + "/" + tag.toLowerCase()).pipe(
      mergeMap(
        (result) => {
          if (Object.keys(result).length === 0) {
            return this.http.get(apiUrl)
              .pipe(
                mergeMap(
                  (getResult: any) => {
                    this.http.post(this.NODEJS, { 
                      "tag": tag,
                      "photos": getResult.photos.photo
                    }, {headers: this.httpHeaders}).subscribe();
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
