import {Component, OnInit} from '@angular/core';
import {DataService} from '@app-shared/data.service';
import {State} from '@app-redux/index';
import {Store} from '@ngrx/store';
import {setSession} from "@app-redux/core.actions";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  LOADING = 'loading';
  ERROR = 'error';
  SUCCESS = 'success';
  signinState: string;
  dnaUrl: string;
  EXPRESS_URL = 'http://localhost:8000';
  token: string;

  constructor(protected store: Store<State>, protected ds: DataService) {
    this.token = ds.getAuthToken();
  }

  ngOnInit(): void {
    let callbackUrl = '/home';
    this.ds.votePoll("SDASD1",0);
    this.dnaUrl = this.buildDnaUrl(this.token, this.EXPRESS_URL, callbackUrl);

  }

  createSession() {
    let count = 0;
    const MAX_COUNT = 60;
    let sessionReturn = false;
    let address: string;
    let json;
    setTimeout(function timeoutfun() {
      json = this.ds.getSession();
      sessionReturn = json['authenticated'];
      if (sessionReturn) {
        address = json['address'];
        this.store.dispatch(setSession({
          value: this.ds.getIdentityData(address)
        }));
      } else if(count<MAX_COUNT) {
        timeoutfun();
      }
    }, 5000);
  }

  /**
   Builds the DNA URL used for the in-app sign-in
   */
  buildDnaUrl(token: string, baseUrl: string, callbackUrl: string): string {
    const callback = new URL(callbackUrl,'http://localhost:4200');
    const startSession = new URL('/auth/v1/start-session', baseUrl);
    const authenticate = new URL('/auth/v1/authenticate', baseUrl);

    return `dna://signin/v1?callback_url=${encodeURIComponent(
      callback.href
    )}&token=${token}&nonce_endpoint=${encodeURIComponent(
      startSession.href
    )}&authentication_endpoint=${encodeURIComponent(authenticate.href)}`;
  }

}
