import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService {

  public dataPipe: Subject<FormData> = new Subject<FormData>();
  public modelResponse: Subject<string> = new Subject<string>();
  private dataPipeSub: Subscription;

  private currentBundledData: FormData = new FormData();

  public imageClassificationResponse: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public imageClassificationResponse$: Observable<string[]> = this.imageClassificationResponse.asObservable();

// todo: make chain of calls to processing models and return the final results

  constructor(){
    this.dataPipeSub = this.dataPipe.subscribe((data: FormData) => {
      this.identifyImages(data);
    });

  }

  public updateImageClassificationResponse(response: string[]) {
    this.imageClassificationResponse.next(response);
  }
  public dataPrepared(bundle: FormData){
    this.dataPipe.next(bundle);
  }

  public modelResponseReceived(response: string){
    this.modelResponse.next(response);
    console.log(response);
  }

  public async extractInfoFromImage(data: FormData): Promise<any> {
    try {
      const res = await axios.post('http://127.0.0.1:5000/extractInfoFromImages', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    

    return res;
  }
  catch (error) {
    console.log('Error sending POST request:', error);
    throw error;
  }
}


  public async identifyImages(data: FormData): Promise<any> {
    try {
      const res = await axios.post('http://127.0.0.1:5000/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      this.modelResponseReceived(res.data);
      // confirmed post is received by flask server as well
      return res;
    } catch (error) {
      // Handle error
      console.error('Error sending POST request:', error);
      throw error;
    }
  }


  public async sortResponsesToBuckets(imageData: string[]): Promise<any> {
    try {
      const comboData = JSON.stringify({
        imageClassificationData: imageData,
      });
      

      const res = await axios.post(`http:///127.0.0.1:5000/sortResponsesToBuckets`, comboData, {headers: {'Content-Type': 'application/json', timeout: 20000}});

      return res;
      // Handle response
    } catch (error) {
      console.error('Error sending POST request:', error);
      throw error;
    }
  }

  public bundleFormData(files: FileList): FormData {
    const bundle = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith('image/')) {
        const key = 'image-' + i;
        const curBlob = new Blob([file], { type: file.type });
        bundle.append(key, curBlob, file.name);
        return bundle
      } else {
        console.log('Not an image file:', file.name);
      }

    }
    this.currentBundledData = bundle;

    return bundle;
  }
}
