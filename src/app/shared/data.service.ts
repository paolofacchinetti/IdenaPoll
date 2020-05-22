import {Injectable} from '@angular/core';
import {SessionBean} from '../shared/model/session.bean';
import {PollBean} from './model/poll.bean';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {State, getSession} from '@app-redux/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  constructor(private httpClient: HttpClient, protected store: Store<State>, protected router: Router) {
    this.store.select(getSession).subscribe(value => {
      this.session = value;
    });
  }

  getSession():any {
    const CALL_URL = this.EXPRESS_URL + '/auth/v1/session';
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      return p;
    }, (err) => {
      console.log(err);
      return '{"authenticated": false}';
    });
  }

  getAuthToken(): string{
    let token: string;
    const CALL_URL = this.EXPRESS_URL + '/auth/v1/new-token';
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      token = p['token'];
    });
    return token;
  }

  getPollById(id: string): PollBean {
    let poll: PollBean;
    const CALL_URL = this.SERVER_URL + '/polls/' + id;
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      poll = new PollBean(p);
    });
    return poll;
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

  getIdentityData(id: string): SessionBean {
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
    });
    return session;
  }

  votePoll(pollId: string, optionValue: number) {
    const CALL_URL = this.EXPRESS_URL + '/vote';
    let body = JSON.stringify({"poll": pollId, "option": optionValue});
    this.httpClient.post<any>(CALL_URL, body, {responseType:"json"}).subscribe((p) => {
      //TODO ADD CONFIRMATION
      console.log(p)
    });
  }

  deletePoll(pollId: string) {
    const CALL_URL = this.EXPRESS_URL + '/delete';
    let body = 'poll-id=' + pollId;
    this.httpClient.post<any>(CALL_URL, body).subscribe((p) => {

    });
  }

  createPoll(poll: PollBean) {
    const CALL_URL = this.EXPRESS_URL + '/create';
    let body = 'poll=' + poll.toString();
    this.httpClient.post<any>(CALL_URL, body).subscribe((p) => {

    });
  }


}
