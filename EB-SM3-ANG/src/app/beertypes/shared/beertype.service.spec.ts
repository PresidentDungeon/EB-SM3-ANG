import { TestBed } from '@angular/core/testing';

import { BeertypeService } from './beertype.service';

describe('BeertypeService', () => {
  let service: BeertypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeertypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
