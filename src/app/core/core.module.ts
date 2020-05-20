import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import {FlexModule} from "@angular/flex-layout";
import { SigninComponent } from './signin/signin.component';
import {SharedModule} from "@app-shared/shared.module";



@NgModule({
  declarations: [TopbarComponent, SigninComponent],
  exports: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    SharedModule
  ]
})
export class CoreModule { }
