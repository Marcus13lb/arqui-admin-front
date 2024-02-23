import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CheckboxModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CardModule
  ]
})
export class PrimengAppModule { }
