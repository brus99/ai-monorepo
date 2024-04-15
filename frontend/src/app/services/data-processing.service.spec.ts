import { TestBed } from '@angular/core/testing';

import { DataProcessingService } from './data-processing.service';
import * as fs from 'fs';
import { Subject } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataProcessingServiceService', () => {
  let service: DataProcessingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataProcessingService]
    });
    service = TestBed.inject(DataProcessingService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call flask api', async () => {
    const imageData = fs.readFileSync('assets/mcqueen.jpeg');

    // Create a Blob from the Buffer
    const blob = new Blob([imageData], { type: 'image/jpeg' });

    // Create a File object
    const file = new File([blob], 'mcqueen.jpeg', { type: 'image/jpeg' });

    console.log(typeof file);

    await service.passToPythonFlaskApi(file);

    httpMock.expectOne('http://127.0.0.1:5000/').flush('response');
  });
});


