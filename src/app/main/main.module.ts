import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PrimengMainModule } from '../primeng/primeng.main.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    HomeComponent,
    ProjectsComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengMainModule,
    MainRoutingModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class MainModule { }
