import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import {FlexModule} from "@angular/flex-layout";



@NgModule({
  declarations: [TopbarComponent],
  exports: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    FlexModule
  ]
})
export class CoreModule { }
