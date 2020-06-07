import {Injectable} from '@angular/core';
import {SessionBean} from '../shared/model/session.bean';
import {PollBean} from './model/poll.bean';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {getSession, State} from '@app-redux/index';
import {HttpClient} from '@angular/common/http';
import {
  setActivePolls,
  setAuth,
  setFilteredPolls,
  setRecentPolls,
  setSelectedPoll,
  setSession,
  setToken
} from '@app-redux/core.actions';
import {openDialogBar} from '@app-shared/open-status-bar.functions';

@Injectable({
  providedIn: 'root'
})
/**
 * Class responsible for the API Calls to retrieve data from the Backend
 */
export class DataService {
  private SERVER_URL = 'https://json.idenapoll.com';
  private IDENA_URL = 'https://api.idena.io/api';
  private EXPRESS_URL = 'https://express.idenapoll.com';
  private session: SessionBean = null;
  private auth: string = '';

  constructor(private httpClient: HttpClient, protected store: Store<State>, protected router: Router) {
    this.store.select(getSession).subscribe(value => {
      this.session = value;
    });
  }

  logoutSession(){
    let CALL_URL = `${this.EXPRESS_URL}/auth/v1/logout`;
    this.httpClient.post<any>(CALL_URL, null, {withCredentials: true}).subscribe((p) => {

    });
  }

  getIdentityData(id: string) {
    let age;
    let status;
    let CALL_URL = this.IDENA_URL + '/Identity/' + id;
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      const json = p['result'];
      status = json['state'].toUpperCase();
      CALL_URL += '/age';
      this.httpClient.get<any>(CALL_URL).subscribe((p) => {
        age = p['result'];
        this.store.dispatch(setSession({value: new SessionBean(parseInt(age), id, status)}));
      });
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
    }, error => openDialogBar(this.store, 'error', 'Generic Error'));
  }

  getPollById(id: string) {
    let poll: PollBean;
    const CALL_URL = this.SERVER_URL + '/polls/' + id;
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      poll = new PollBean(p);
      this.store.dispatch(setSelectedPoll({value: poll}));
    }, (error) => openDialogBar(this.store, 'warning', 'This poll does not exists!', true));
  }

  getRecentPolls() {
    let polls: PollBean[] = [];
    const CALL_URL = this.SERVER_URL + '/polls?_sort=createdAt&_order=desc&_limit=10&status=active';
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      for (let j of p) {
        polls.push(new PollBean(j));
      }
      this.store.dispatch(setRecentPolls({value: polls}));
    }, error => openDialogBar(this.store, 'error', 'Generic Error'));
  }

  getActivePolls() {
    let polls: PollBean[] = [];
    const CALL_URL = this.SERVER_URL + '/polls?status=active';
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      for (let j of p) {
        polls.push(new PollBean(j));
      }
      this.store.dispatch(setActivePolls({value: polls}));
    }, error => openDialogBar(this.store, 'error', 'Generic Error'));
  }

  votePoll(pollId: string, optionValue: number) {
    const CALL_URL = this.EXPRESS_URL + '/vote';
    let body = JSON.stringify({'poll': pollId, 'option': optionValue, 'voter': this.session.address, 'status': this.session.status, 'age': this.session.age});
    this.httpClient.post<any>(CALL_URL, body, {responseType: 'json', withCredentials: true}).subscribe((p) => {
      switch(p['status']) {
        case 'ok': {
          openDialogBar(this.store, 'info', 'Vote Submitted correctly!');
          break;
        }
        case 'dup': {
          openDialogBar(this.store, 'error', 'You already voted on this poll!');
          break;
        }
        case 'noAge': {
          openDialogBar(this.store, 'error', 'Your Identity is not old enough to vote on this poll.');
          break;
        }
        case 'noStatus': {
          openDialogBar(this.store, 'error', 'Your Identity status does not qualify for voting on this poll.');
          break;
        }
        default: {
          openDialogBar(this.store, 'error', 'Generic Error');
          break;
        }
      }
    }, error => openDialogBar(this.store, 'error', 'Generic Error'));
  }

  createPoll(poll: PollBean) {
    const CALL_URL = this.EXPRESS_URL + '/create';
    this.httpClient.post<any>(CALL_URL, JSON.stringify(poll), {
      responseType: 'json',
      withCredentials: true
    }).subscribe((p) => {
      openDialogBar(this.store, 'info', 'Poll created correctly');
      this.router.navigateByUrl(`/poll/${p['id']}`);
    }, error => openDialogBar(this.store, 'error', 'Generic Error'));
  }


  getPollByWords(value: string) {
    let polls: PollBean[] = [];
    const CALL_URL = this.SERVER_URL + '/polls?q=' + value;
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      for (let j of p) {
        polls.push(new PollBean(j));
      }
      this.store.dispatch(setFilteredPolls({value: polls}));
      this.router.navigateByUrl('/search')
    }, error => openDialogBar(this.store, 'error', 'Generic Error'));
  }

  getPollsCreatedBy() {
    let polls: PollBean[] = [];
    const CALL_URL = this.SERVER_URL + '/polls?creator=' + this.session.address;
    this.httpClient.get<any>(CALL_URL).subscribe((p) => {
      for (let j of p) {
        polls.push(new PollBean(j));
      }
      this.store.dispatch(setFilteredPolls({value: polls}));
      this.router.navigateByUrl('/mypolls')
    }, error => openDialogBar(this.store, 'error', 'Generic Error'));
  }
}
