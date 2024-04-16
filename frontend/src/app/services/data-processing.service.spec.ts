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
    const formData = new FormData();

    const blob = new Blob([imageData], { type: 'image/jpeg' });

    const reader = new FileReader();
    reader.onload = function(event) {
      const contents = event.target?.result;
    };

    formData.append('image-0', blob, 'mcqueen.jpeg');

    // confirmed formData has a n iamge as the value
    await service.passToPythonFlaskApi(formData);
    setTimeout(() =>  5000);



    httpMock.expectOne('http://127.0.0.1:5000/').flush('response');
  });
});


