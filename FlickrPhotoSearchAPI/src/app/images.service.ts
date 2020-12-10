import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  @Input() tags = "";
  apiKey = "";
  server = "";
  id = "";
  secret = "";
  sizeSuffix = "";

  constructor(private http: HttpClient) { }

  getJson(): Observable<any> {
    return this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.apiKey + '&tags=' + this.tags + '/&format=json&nojsoncallback=1');
  }

  getImages(): Observable<any> {
    return this.http.get("https://live.staticflickr.com/" + this.server + "/" + this.id + "_" + this.secret + ".jpg");
    // return this.http.get("https://live.staticflickr.com/" + this.server + "/" + this.id + "_" + this.secret + "_" + this.sizeSuffix + ".jpg");
  }
}

//                              /server/id_secret_sizeSuffix.jpg
// https://live.staticflickr.com/65535/50701109548_3f92ba32af.jpg