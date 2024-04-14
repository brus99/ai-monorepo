import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataProcessingService } from '../services/data-processing.service';

@Component({
  selector: 'app-data-action-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-action-component.component.html',
  styleUrl: './data-action-component.component.css',
})
export class DataActionComponent {

  constructor(private dataProcessingService: DataProcessingService){
    this.dataProcessingService = dataProcessingService;
  }


  public processData(): void {
    
  }
}
