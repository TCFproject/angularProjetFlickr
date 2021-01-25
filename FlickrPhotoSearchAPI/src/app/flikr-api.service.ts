import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlikrAPIService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:variable-name
  api_key = '26e0de555f194b85c18c29ff7277f3a1';

  getFlikrImg(tag): Observable<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.api_key + '&' + tag + 'format=json&nojsoncallback=1');
  }
  // tslint:disable-next-line:variable-name
  getFlikrInfo(photo_id): Observable<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + this.api_key + '&photo_id=' + photo_id + '&format=json&nojsoncallback=1');
  }
}
