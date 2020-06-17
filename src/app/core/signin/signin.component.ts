import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from '@app-shared/data.service';
import {getAuth, getSession, State} from '@app-redux/index';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {signinUrl} from "@app-shared/signin-url.function";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {
  LOADING = 'loading';
  FAILED = 'failed';
  SUCCESS = 'success';
  signinState: string;
  dnaUrl: string;
  token: string;
  count = 0;


  constructor(protected store: Store<State>, protected ds: DataService) {
    signinUrl(this.store, this.ds);
    this.store.pipe(select(getSession), filter((p) => p != null)).subscribe(s => {
      this.signinState = 'success';
    });
    this.store.select(getAuth).subscribe(s => {
      this.signinState = 'loading';
      const MAX_COUNT = 60;
      let sessionReturn;
      let address: string;
      sessionReturn = s['authenticated'];
      if (!!sessionReturn) {
        address = s['address'];
        this.ds.getIdentityData(address);
      } else if (this.count < MAX_COUNT) {
        this.count++;
        setTimeout(() => this.ds.getSession(), 5000);
      }
      if (this.count == MAX_COUNT){
        this.signinState = 'failed';
      }
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }



}
