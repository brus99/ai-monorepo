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
    this.dataPipeSub = this.dataPipe.subscribe((data: File) => {// left off here for the night, working through formData type in unit test from angular component -> flask server
      this.passToPythonFlaskApi(data);
    });

  }

  public dataPrepared(bundle: FormData){
    this.dataPipe.next(bundle);
  }

  public modelResponseReceived(response: string){
    this.modelResponse.next(response);
  }


  public async passToPythonFlaskApi(data: File) : Promise<any>{
    console.log(data);
    const res = await axios.post('http://127.0.0.1:5000', data);

    this.modelResponseReceived(res.data);

    return res;
  }
}
