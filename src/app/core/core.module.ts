import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './topbar/topbar.component';
import {FlexModule} from '@angular/flex-layout';
import {SigninComponent} from './signin/signin.component';
import {SharedModule} from '@app-shared/shared.module';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {CreateComponent} from './create/create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {PollComponent} from './poll/poll.component';


@NgModule({
  declarations: [TopbarComponent, SigninComponent, HomeComponent, CreateComponent, PollComponent],
  exports: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    FormsModule
  ],
  providers: [FormsModule]
})
export class CoreModule { }
