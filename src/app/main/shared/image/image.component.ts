import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() img!: string;
  @Output () delete: EventEmitter<any> = new EventEmitter()

  deleteImage = () => {
    this.delete.emit()
  }
}
