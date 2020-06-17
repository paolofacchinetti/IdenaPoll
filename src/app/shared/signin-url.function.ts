import {getToken, State} from "@app-redux/index";
import {select, Store} from "@ngrx/store";
import {filter} from "rxjs/operators";
import {DataService} from "@app-shared/data.service";

let EXPRESS_URL = 'https://express.idenapoll.com';
let WEBSITE_URL = 'https://idenapoll.com';

export function signinUrl(store: Store<State>, ds: DataService) {
  ds.getAuthToken();
  store.pipe(select(getToken), filter((p) => p != null)).subscribe((s) => {
    let callbackUrl = '/home';
    let dnaUrl = buildDnaUrl(s, EXPRESS_URL, callbackUrl);
    window.location.href = dnaUrl;
  });
}

/**
 Builds the DNA URL used for the in-app sign-in
 */
export function buildDnaUrl(token: string, baseUrl: string, callbackUrl: string): string {
  const callback = new URL(callbackUrl, WEBSITE_URL);
  const startSession = new URL('/auth/v1/start-session', baseUrl);
  const authenticate = new URL('/auth/v1/authenticate', baseUrl);
  const favicon = new URL('/favicon.ico', WEBSITE_URL);

  return `dna://signin/v1?callback_url=${encodeURIComponent(
    callback.href
  )}&token=${token}&nonce_endpoint=${encodeURIComponent(
    startSession.href
  )}&favicon_url=${encodeURIComponent(favicon.href)}&authentication_endpoint=${encodeURIComponent(authenticate.href)}`;
}
