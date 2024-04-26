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
      this.identifyImages(data);
    });

  }

  public dataPrepared(bundle: FormData){
    this.dataPipe.next(bundle);
  }

  public modelResponseReceived(response: string){
    this.modelResponse.next(response);
    console.log(response);
  }


  public async identifyImages(data: FormData): Promise<any> {
    try {
      const res = await axios.post('http://127.0.0.1:5000', data, {
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


  public async getClothingCombos(clothingList: string[]): Promise<any> {
    try {
      const res = await axios.post(`http:///127.0.0.1:5000/suggestCombos`, clothingList);

      return res;
      // Handle response
    } catch (error) {
      console.error('Error sending POST request:', error);
      throw error;
    }
  }
}
