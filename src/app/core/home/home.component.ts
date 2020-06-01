import {Component, OnDestroy, OnInit} from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';
import {State} from '@app-redux/index';
import {Store} from '@ngrx/store';
import {DataService} from '@app-shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  recentPolls: PollBean[];
  popularPolls: PollBean[];

  constructor(protected store: Store<State>, protected ds: DataService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
