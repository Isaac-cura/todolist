import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './toast-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ToastContainerComponent],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [ToastContainerComponent]
})
export class ToastContainerModule { }
