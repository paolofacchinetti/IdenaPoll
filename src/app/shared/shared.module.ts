import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import * as fromCore from "@app-redux/core.reducers";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ core: fromCore.reducer }),
  ]
})
export class SharedModule { }
