import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getPopularPolls, State} from '@app-redux/index';
import {filter} from 'rxjs/operators';
import {DataService} from '@app-shared/data.service';
import {PollBean} from '@app-shared/model/poll.bean';
import {endActivePoll} from "@app-redux/core.actions";

@Component({
  selector: 'app-popular-tab',
  templateUrl: './popular-tab.component.html',
  styleUrls: ['./popular-tab.component.scss']
})
export class PopularTabComponent implements OnInit {
  public popularPolls: PollBean[];

  constructor(protected store: Store<State>, protected ds: DataService) {
    this.ds.getActivePolls();
    this.store.pipe(select(getPopularPolls), filter((f) => f != null && (f instanceof Array && f.length > 0))).subscribe((j) => {
      this.popularPolls = j;
    });
  }

  ngOnInit(): void {
  }

  pollEnded(id: string) {
    this.store.dispatch(endActivePoll({value: id}))
  }
}
