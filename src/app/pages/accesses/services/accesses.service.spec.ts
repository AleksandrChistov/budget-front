import { TestBed } from '@angular/core/testing';

import { AccessesService } from './accesses.service';
import { provideHttpClient } from '@angular/common/http';

describe('AccessesService', () => {
  let service: AccessesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AccessesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
