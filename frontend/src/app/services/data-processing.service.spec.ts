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
      formData.append('image-1', blob, 'mcqueen.jpeg');


      const res = await service.identifyImage(formData);

      expect(res.data[0]["answer"]).toEqual('shirt');

    });
    it('should call flask api for multiple files', async () => {
      const imageData = fs.readFileSync('assets/mcqueen.jpeg');
      const imageDataTwo = fs.readFileSync('assets/elephant.jpeg');

      const formData = new FormData();
      const formDataTwo = new FormData();

      const blob = new Blob([imageData], { type: 'image/jpeg' });

      const blobTwo = new Blob([imageDataTwo], { type: 'image/jpeg' });

      formData.append('image-0', blob, 'mcqueen.jpeg');
      formDataTwo.append('image-1', blobTwo, 'elephant.jpeg');

      const res = await service.identifyImage(formDataTwo);


      const resTwo = await service.identifyImage(formDataTwo);

      console.log(res.data)
      console.log(resTwo.data)

      expect(res.data).toEqual(resTwo.data);
    });
  });


