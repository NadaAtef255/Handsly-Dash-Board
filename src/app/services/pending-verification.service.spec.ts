import { TestBed } from '@angular/core/testing';

import { PendingVerificationService } from './pending-verification.service';

describe('PendingVerificationService', () => {
  let service: PendingVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
