import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataProcessingService } from '../services/data-processing.service';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.css',
})
export class ImageInputComponent {
  @ViewChild('fileInput') fileInput: any;

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }


  private bundledData: FormData = new FormData();

  constructor(private dataProcessingService: DataProcessingService){


  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const images = event.dataTransfer?.files;
    if (images) {
      this.handleFiles(images);
    }
    
  }

  private handleFiles(files: FileList) {
    const bundle = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith('image/')) {
        const key = 'image-' + i;
        const curBlob = new Blob([file], { type: file.type });
        bundle.append(key, curBlob, file.name);
        this.bundledData = bundle
        // emit event that data was bundled
        console.log('Image file:', file);
      } else {
        console.log('Not an image file:', file.name);
      }
    }

    this.dataProcessingService.identifyImages(this.bundledData);
  }
  
}



