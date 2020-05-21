import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '@app-shared/data.service';
import {State} from '@app-redux/index';
import {Store} from '@ngrx/store';


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
  EXPRESS_URL = 'localhost:8000';
  constructor() { }

  ngOnInit(): void {
    let callbackUrl;
    let token;
    this.dnaUrl = this.buildDnaUrl(token, this.EXPRESS_URL, callbackUrl);

  }


  /**
    Builds the DNA URL used for the in-app sign-in
   */
  buildDnaUrl(token: string, baseUrl: string, callbackUrl: string): string{
    const callback = new URL(callbackUrl, baseUrl)
    const startSession = new URL('/auth/v1/start-session', baseUrl)
    const authenticate = new URL('/auth/v1/authenticate', baseUrl)

    // TODO add favicon_url= parameter with IDENAPOLL Logo
    const dnaUrl = `dna://signin/v1?callback_url=${encodeURIComponent(
      callback.href
    )}&token=${token}&nonce_endpoint=${encodeURIComponent(
      startSession.href
    )}&authentication_endpoint=${encodeURIComponent(authenticate.href)}`;
    return dnaUrl;
  }

}
