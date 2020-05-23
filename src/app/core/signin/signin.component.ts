import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from '@app-shared/data.service';
import {getAuth, getSession, getToken, State} from '@app-redux/index';
import {select, Store} from '@ngrx/store';
import {setSession} from "@app-redux/core.actions";
import {async} from "rxjs/internal/scheduler/async";
import {filter} from 'rxjs/operators';


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
  EXPRESS_URL = 'http://localhost:8000';
  token: string;
  count = 0;


  constructor(protected store: Store<State>, protected ds: DataService) {
    this.ds.getAuthToken();
    this.store.pipe(select(getToken), filter((p) => p != null)).subscribe((s) => {
      this.token = s;
      let callbackUrl = '/home';
      this.dnaUrl = this.buildDnaUrl(this.token, this.EXPRESS_URL, callbackUrl);
      window.location.href = this.dnaUrl;
    });
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
        this.store.dispatch(setSession({
          value: this.ds.getIdentityData(address)
        }));
      } else if (this.count < MAX_COUNT) {
        this.count++;
        setTimeout(() => this.ds.getSession(), 5000);
      }
      this.signinState = 'failed';
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  /**
   Builds the DNA URL used for the in-app sign-in
   */
  buildDnaUrl(token: string, baseUrl: string, callbackUrl: string): string {
    const callback = new URL(callbackUrl, 'http://localhost:4200');
    const startSession = new URL('/auth/v1/start-session', baseUrl);
    const authenticate = new URL('/auth/v1/authenticate', baseUrl);

    return `dna://signin/v1?callback_url=${encodeURIComponent(
      callback.href
    )}&token=${token}&nonce_endpoint=${encodeURIComponent(
      startSession.href
    )}&authentication_endpoint=${encodeURIComponent(authenticate.href)}`;
  }

}
