import { TestBed } from '@angular/core/testing';

import { FacultyDetailsService } from './faculty-details.service';

describe('FacultyDetailsService', () => {
  let service: FacultyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
