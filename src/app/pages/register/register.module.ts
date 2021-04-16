import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    DirectivesModule
  ]
})
export class RegisterModule { }
