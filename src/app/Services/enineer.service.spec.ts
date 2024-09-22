import { TestBed } from '@angular/core/testing';
import { EngineerService } from './enineer.service';

// import { EnineerService } from './enineer.service';

describe('EnineerService', () => {
  let service: EngineerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
