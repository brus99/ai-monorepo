import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.css',
})
export class ImageInputComponent {
  private images: FileList = {} as FileList;

  public inputFiles(list: FileList): string[] {
    const reader = new FileReader();
    const parsedImages: string[] = [];

    for(let i = 0; i < list.length; i++) {
      const file = list.item(i);
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          parsedImages.push(event.target.result);
        };
      }
    }

    return parsedImages;
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
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        // Process image file
        console.log('Image file:', file);
      } else {
        console.log('Not an image file:', file.name);
      }
    }
  }
  
}



