import {Injectable} from '@angular/core';
import {SessionBean} from '../shared/model/session.bean';
import {PollBean} from './model/poll.bean';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {State, getSession} from '@app-redux/index';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
/**
 * Class responsible for the API Calls to retrieve data from the Backend
 */
export class DataService {
  private SERVER_URL = 'http://localhost:80';
  private session: SessionBean = null;

  constructor(private httpClient: HttpClient, protected store: Store<State>, protected router: Router) {
    this.store.select(getSession).subscribe(value => {
      this.session = value;
    });
  }

  getById(id: string): PollBean {
    let poll: PollBean;
    const FINAL_URL = this.SERVER_URL + '/polls/' + id;
    this.httpClient.get<any>(FINAL_URL.toString()).subscribe((p) => {
      poll = new PollBean(p);
    });
    return poll;
  }

  getActivePolls(): PollBean[] {
    let polls: PollBean[] = [];
    const FINAL_URL = this.SERVER_URL + '/polls?status=active';
    this.httpClient.get<any>(FINAL_URL).subscribe((p) => {
      for (let j of p) {
        polls.push(new PollBean(j));
      }
    });
    return polls;
  }
}
