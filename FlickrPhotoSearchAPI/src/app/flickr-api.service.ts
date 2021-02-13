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

  api_key: string = '39293cea7646ac5004421a4acadfa1fa';
  NODEJS: string = "http://localhost:7000/images";
  httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

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
