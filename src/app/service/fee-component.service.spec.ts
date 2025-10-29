import { TestBed } from '@angular/core/testing';

import { FeeComponentService } from './fee-component.service';

describe('FeeComponentService', () => {
  let service: FeeComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
