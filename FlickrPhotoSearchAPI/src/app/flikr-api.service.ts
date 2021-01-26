import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlikrAPIService {

  constructor(private http: HttpClient) { }

  api_key = '4b1eeca90d00c40090f976710f0e125b';
  NODEJS = "http://localhost:7000/images";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  getFlikrImg(tag): Observable<any> {
    this.http.post(this.NODEJS, { 
      "tag": tag,
      "url": "test_angular",
      "auteur": "test_angular",
      "titre": "test_angular",
      "datepost": "test_angular"
    }, {headers: this.httpHeaders});
    return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.api_key + '&tags=' + tag + '&format=json&nojsoncallback=1');
  }
  getFlikrInfo(photo_id): Observable<any> {
    return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + this.api_key + '&photo_id=' + photo_id + '&format=json&nojsoncallback=1');
  }
}
