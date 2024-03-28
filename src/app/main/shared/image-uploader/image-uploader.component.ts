import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  
  @Output () emitImages: EventEmitter<string[]> = new EventEmitter()
  env = environment
  images: string[] = []
  @ViewChild('fileInput') fileInput!: ElementRef

  onFileSelected = async (event:any) => {
    console.log(event.target.files)
    for(let file of event.target.files){
      const result : string | null = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          resolve(event.target?.result as string)
        }
        reader.onerror = (_) => {
          resolve(null)
        }

      })

      if(result !== null) {
        this.images.push(result)
      }
    }
    this.emitImages.emit(this.images)
  }

  removeImage = (_: any, index:number) => {
    this.images.splice(index, 1)
    this.emitImages.emit(this.images)
  }

  openFileExplorer = () => {
    this.fileInput.nativeElement.click();
  }

}
