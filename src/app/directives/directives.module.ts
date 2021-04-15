import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlErrorDirective } from './formControlError/form-control-error.directive';



@NgModule({
  declarations: [FormControlErrorDirective],
  imports: [
    CommonModule
  ],
  exports: [
    FormControlErrorDirective
  ]
})
export class DirectivesModule { }
