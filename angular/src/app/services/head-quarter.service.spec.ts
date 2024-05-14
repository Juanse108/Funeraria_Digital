import { TestBed } from '@angular/core/testing';

import { HeadquarterService } from './head-quarter.service';

describe('HeadquarterService', () => {
  let service: HeadquarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadquarterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
