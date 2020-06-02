import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getRecentPolls, State} from '@app-redux/index';
import {filter} from 'rxjs/operators';
import {DataService} from '@app-shared/data.service';
import {PollBean} from '@app-shared/model/poll.bean';

@Component({
  selector: 'app-recent-tab',
  templateUrl: './recent-tab.component.html',
  styleUrls: ['./recent-tab.component.scss']
})
export class RecentTabComponent implements OnInit {
  public recentPolls: PollBean[];

  constructor(protected store: Store<State>, protected ds: DataService) {
    this.ds.getRecentPolls();
    this.store.pipe(select(getRecentPolls), filter((f) => f != null && (f instanceof Array && f.length > 0))).subscribe((p) => {
      this.recentPolls = p;
    });
  }

  ngOnInit(): void {
  }

}
