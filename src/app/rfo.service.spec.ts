import { TestBed } from '@angular/core/testing';

import { RfoService } from './rfo.service';

describe('RfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RfoService = TestBed.get(RfoService);
    expect(service).toBeTruthy();
  });
});
