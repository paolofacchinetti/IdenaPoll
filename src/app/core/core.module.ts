import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './topbar/topbar.component';
import {FlexModule} from '@angular/flex-layout';
import {SigninComponent} from './signin/signin.component';
import {SharedModule} from '@app-shared/shared.module';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {CreateComponent} from './create/create.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TopbarComponent, SigninComponent, HomeComponent, CreateComponent],
  exports: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
