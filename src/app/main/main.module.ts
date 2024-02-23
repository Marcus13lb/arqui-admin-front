import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PrimengMainModule } from '../primeng/primeng.main.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';


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
    FormsModule,
    PrimengMainModule,
    MainRoutingModule
  ]
})
export class MainModule { }
