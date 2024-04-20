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


      formData.append('image-0', blob, 'mcqueen.jpeg');


      const res = await service.passToPythonFlaskApi(formData);

      expect(res.data[0]["answer"]).toEqual('shirt');

    });
  });


