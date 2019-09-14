import { TestBed } from '@angular/core/testing';

import { RedeemService } from './redeem.service';

describe('RedeemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedeemService = TestBed.get(RedeemService);
    expect(service).toBeTruthy();
  });
});
