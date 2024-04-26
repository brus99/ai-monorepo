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


      const res = await service.identifyImages(formData);

      expect(res.data[0]["answer"]).toEqual('shirt');

    });
    it('should call flask api for multiple files', async () => {
      const imageData = fs.readFileSync('assets/mcqueen.jpeg');
      const imageDataTwo = fs.readFileSync('assets/elephant.jpeg');

      const formDataTwo = new FormData();

      const blob = new Blob([imageData], { type: 'image/jpeg' });

      const blobTwo = new Blob([imageDataTwo], { type: 'image/jpeg' });

      formDataTwo.append('image-0', blob, 'mcqueen.jpeg');
      formDataTwo.append('image-1', blobTwo, 'elephant.jpeg');

      const res = await service.identifyImages(formDataTwo);

      expect(res.data[0]).toContain('red shirt');
      expect(res.data[1]).toContain('elephant');

    });

    it('should return combos for hot weather from flask api', async () => {
      const clothingList = ['short sleeve green shirt', 'shorts', 'long pants', 'hat', 'sunglasses','flip flops', 'boots', 'scarf', 'gloves', 'jacket', 'sweater','blue jeans', 'heavy coat', 'light coat', 'heavy pants'];

      const modifiedClothingList = clothingList.map((item) => 
        item.replace(/ /g, '%')
      );


      const res = await service.getClothingCombos(modifiedClothingList);
    });
  });


