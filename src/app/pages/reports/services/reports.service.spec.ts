import { TestBed } from '@angular/core/testing';

import { ReportsService } from './reports.service';
import { provideHttpClient } from '@angular/common/http';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
