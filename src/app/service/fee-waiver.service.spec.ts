import { TestBed } from '@angular/core/testing';

import { FeeWaiverService } from './fee-waiver.service';

describe('FeeWaiverService', () => {
  let service: FeeWaiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeWaiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
