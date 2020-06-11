import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from '@app-shared/data.service';
import {getAuth, getSession, getToken, State} from '@app-redux/index';
import {select, Store} from '@ngrx/store';
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
  EXPRESS_URL = 'https://express.idenapoll.com';
  WEBSITE_URL = 'https://idenapoll.com';
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

  /**
   Builds the DNA URL used for the in-app sign-in
   */
  buildDnaUrl(token: string, baseUrl: string, callbackUrl: string): string {
    const callback = new URL(callbackUrl, this.WEBSITE_URL);
    const startSession = new URL('/auth/v1/start-session', baseUrl);
    const authenticate = new URL('/auth/v1/authenticate', baseUrl);
    const favicon = new URL('/favicon.ico', this.WEBSITE_URL);

    return `dna://signin/v1?callback_url=${encodeURIComponent(
      callback.href
    )}&token=${token}&nonce_endpoint=${encodeURIComponent(
      startSession.href
    )}&favicon_url=${encodeURIComponent(favicon.href)}&authentication_endpoint=${encodeURIComponent(authenticate.href)}`;
  }

}
