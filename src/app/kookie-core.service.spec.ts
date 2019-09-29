import { TestBed } from '@angular/core/testing';

import { KookieCoreService } from './kookie-core.service';

describe('KookieCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KookieCoreService = TestBed.get(KookieCoreService);
    expect(service).toBeTruthy();
  });
});
