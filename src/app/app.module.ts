import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as fromCore from './redux/core.reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from '@app-core/signin/signin.component';
import {HomeComponent} from '@app-core/home/home.component';

const appRoutes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'home', component: HomeComponent},
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot({ core: fromCore.reducer }),
    RouterModule.forRoot(
      appRoutes
    ),
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
