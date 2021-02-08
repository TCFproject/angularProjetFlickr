import { TestBed } from '@angular/core/testing';

import { FlickrAPIService } from './flickr-api.service';

describe('FlikrAPIService', () => {
  let service: FlickrAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlickrAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
