import { Component } from '@angular/core';
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
  private images: FileList = new FileList();

  private bundledData: FormData = new FormData();

  constructor(private dataProcessingService: DataProcessingService){


  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.images = event.dataTransfer?.files ?? new FileList();
    if (this.images.length) {
      this.handleFiles(this.images);
    }
  }

  private handleFiles(files: FileList) {
    const bundle = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith('image/')) {
        const key = 'image-' + i;
        bundle.append(key, file);
        this.bundledData = bundle
        // emit event that data was bundled
        console.log('Image file:', file);
      } else {
        console.log('Not an image file:', file.name);
      }
    }

    this.dataProcessingService.passToPythonFlaskApi(this.bundledData);
  }
  
}



