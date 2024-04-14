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

  //dataReadyEmitter$ = this.dataReady.asObservable();

  constructor(){
    this.dataPipeSub = this.dataPipe.subscribe((data: FormData) => {
      this.passToPythonFlaskApi(data);
    });

  }

  public dataPrepared(bundle: FormData){
    this.dataPipe.next(bundle);
  }

  public modelResponseReceived(response: string){
    this.modelResponse.next(response);
  }


  public async passToPythonFlaskApi(data: FormData){
    const res = await axios.post('http://localhost:5000/api', data, {headers: {'Content-Type': 'multipart/form-data'}});

    this.modelResponseReceived(res.data);

    return res;
  }
}
