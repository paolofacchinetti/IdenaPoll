import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import {FlexModule} from "@angular/flex-layout";
import { SigninComponent } from './signin/signin.component';
import {SharedModule} from "@app-shared/shared.module";
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [TopbarComponent, SigninComponent, HomeComponent],
  exports: [
    TopbarComponent
  ],
    imports: [
        CommonModule,
        FlexModule,
        SharedModule,
        RouterModule
    ]
})
export class CoreModule { }
