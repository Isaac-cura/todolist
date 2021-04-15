import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsModule } from './form-errors/form-errors.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormErrorsModule
  ], exports: [FormErrorsModule]
})
export class ComponentsModule { }
