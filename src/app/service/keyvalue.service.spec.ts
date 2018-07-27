import { TestBed, inject } from '@angular/core/testing';

import { KeyvalueService } from './keyvalue.service';

describe('KeyvalueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyvalueService]
    });
  });

  it('should be created', inject([KeyvalueService], (service: KeyvalueService) => {
    expect(service).toBeTruthy();
  }));
});
