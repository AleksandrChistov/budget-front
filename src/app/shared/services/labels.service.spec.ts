import { TestBed } from '@angular/core/testing';

import { LabelsService } from './labels.service';
import { provideHttpClient } from '@angular/common/http';

describe('LabelsService', () => {
  let service: LabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(LabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
