import { TestBed } from '@angular/core/testing';

import { DataUnescoService } from './data-unesco.service';

describe('DataUnescoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataUnescoService = TestBed.get(DataUnescoService);
    expect(service).toBeTruthy();
  });
});
