import { TestBed } from '@angular/core/testing';

import { LateFeeRuleService } from './late-fee-rule.service';

describe('LateFeeRuleService', () => {
  let service: LateFeeRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LateFeeRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
