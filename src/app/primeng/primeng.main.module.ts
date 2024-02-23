import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ToastModule,
    SidebarModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    DividerModule,
    CardModule,
    BreadcrumbModule,
    SpeedDialModule
  ]
})
export class PrimengMainModule { }
