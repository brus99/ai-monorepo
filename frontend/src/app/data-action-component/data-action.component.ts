import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataProcessingService } from '../services/data-processing.service';

@Component({
  selector: 'app-data-action-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-action.component.html',
  styleUrl: './data-action.component.css',
})
export class DataActionComponent implements OnInit{

  constructor(private dataProcessingService: DataProcessingService){
  }
  ngOnInit(): void {
    this.dataProcessingService.dataPipe.subscribe((data: FormData) => {
      this.processData(data);
    });
  }

  public async processData(data: FormData){

      
      const response = await this.dataProcessingService.identifyImages(data);

      const identificationData = response[0]

      const bucketResponse = await this.dataProcessingService.sortResponsesToBuckets(identificationData);

  






  }
}
