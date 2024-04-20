import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService {

  public dataPipe: Subject<FormData> = new Subject<FormData>();
  public modelResponse: Subject<string> = new Subject<string>();
  private dataPipeSub: Subscription;
  

  constructor(){
    this.dataPipeSub = this.dataPipe.subscribe((data: FormData) => {
      this.identifyImage(data);
    });

  }

  public dataPrepared(bundle: FormData){
    this.dataPipe.next(bundle);
  }

  public modelResponseReceived(response: string){
    this.modelResponse.next(response);
    console.log(response);
  }


  public async identifyImage(data: FormData): Promise<any> {
    try {
      const res = await axios.post('http://127.0.0.1:5000', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      

      console.log('Response from POST request:', res.data);
      

      this.modelResponseReceived(res.data);
      // confirmed post is received by flask server as well
      console.log('hello', res.data)
      return res;
    } catch (error) {
      // Handle error
      console.error('Error sending POST request:', error);
      throw error;
    }
  }
}
