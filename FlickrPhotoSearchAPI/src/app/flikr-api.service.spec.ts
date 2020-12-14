import { TestBed } from '@angular/core/testing';

import { FlikrAPIService } from './flikr-api.service';

describe('FlikrAPIService', () => {
  let service: FlikrAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlikrAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
