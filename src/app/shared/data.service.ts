import {Injectable} from '@angular/core';
import {SessionBean} from '../shared/model/session.bean';
import {PollBean} from './model/poll.bean';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {State, getSession, getAuth} from '@app-redux/index';
import {HttpClient} from '@angular/common/http';
import {AsyncSubject} from 'rxjs';
import {setAuth, setSession, setToken} from '@app-redux/core.actions';

@Injectable({
  providedIn: 'root'
})
/**
 * Class responsible for the API Calls to retrieve data from the Backend
 */
export class DataService {
  private SERVER_URL = 'http://localhost:80';
  private IDENA_URL = 'http://api.idena.io/api/';
  private EXPRESS_URL = 'http://localhost:8000';
  private session: SessionBean = null;
  private auth: string = '';

  constructor(private httpClient: HttpClient, protected store: Store<State>, protected router: Router) {
    this.store.select(getSession).subscribe(value => {
      this.session = value;
    });
  }

  getIdentityData(id: string) {
    console.log(id);
    let session = new SessionBean();
    let CALL_URL = this.IDENA_URL + '/Identity/' + id;
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      const json = p['result'];
      session.address = json['address'];
      session.status = json['state'];
    });
    CALL_URL += '/age';
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      session.age = p['result'];
      this.store.dispatch(setSession({value: session}));
    });
  }

  getSessionOnlyCheck() {
    const CALL_URL = this.EXPRESS_URL + '/auth/v1/session?onlyCheck=true';
    let address;
    this.httpClient.get<any>(CALL_URL, {withCredentials: true}).subscribe((p) => {
      address = p['address'];
      this.getIdentityData(address);
    });


  }

  getSession(): any {
    const CALL_URL = this.EXPRESS_URL + '/auth/v1/session';
    this.httpClient.get<any>(CALL_URL, {withCredentials: true}).subscribe((p) => {
      this.store.dispatch(setAuth({value: p}));
    }, (err) => {
      console.log(err);
      this.auth += '1';
      this.store.dispatch(setAuth({value: this.auth}));
    });
  }

  getAuthToken(): void {
    let token: string = '';
    const CALL_URL = this.EXPRESS_URL + '/auth/v1/new-token';
    this.httpClient.get<JSON>(CALL_URL, {
      withCredentials: true,
      responseType: 'json',
      headers: {
        'Accept': 'application/json; charset=utf-8',
      }
    }).subscribe((p) => {
      token = p['token'];
      this.store.dispatch(setToken({value: token}));
    });
  }

  getPollById(id: string): PollBean {
    let poll: PollBean;
    const CALL_URL = this.SERVER_URL + '/polls/' + id;
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      poll = new PollBean(p);
    });
    return poll;
  }

  getRecentPolls(): PollBean[] {
    let polls: PollBean[] = [];
    const CALL_URL = this.SERVER_URL + '/polls?_sort=createdAt&_order=desc&_limit=10&status=active';
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      for (let j of p) {
        polls.push(new PollBean(j));
      }
    });
    return polls;
  }

  getActivePolls(): PollBean[] {
    let polls: PollBean[] = [];
    const CALL_URL = this.SERVER_URL + '/polls?status=active';
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      for (let j of p) {
        polls.push(new PollBean(j));
      }
    });
    return polls;
  }


  votePoll(pollId: string, optionValue: number) {
    const CALL_URL = this.EXPRESS_URL + '/vote';
    let body = JSON.stringify({'poll': pollId, 'option': optionValue});
    this.httpClient.post<any>(CALL_URL, body, {responseType: 'json', withCredentials:true}).subscribe((p) => {
      //TODO ADD CONFIRMATION
      console.log(p);
    });
  }

  createPoll(poll: PollBean) {
    const CALL_URL = this.EXPRESS_URL + '/create';
    this.httpClient.post<any>(CALL_URL, JSON.stringify(poll)).subscribe((p) => {

    });
  }


}
