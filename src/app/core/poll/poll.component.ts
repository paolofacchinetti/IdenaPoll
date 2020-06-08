import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "@app-shared/data.service";
import {select, Store} from "@ngrx/store";
import {getSelectedPoll, State} from "@app-redux/index";
import {filter} from "rxjs/operators";
import {PollBean} from "@app-shared/model/poll.bean";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  selectedPoll: PollBean;

  constructor(protected store: Store<State>, protected route: ActivatedRoute, protected ds: DataService) {
    this.store.pipe(select(getSelectedPoll), filter((f) => f != null)).subscribe((p) => {
      this.selectedPoll = p;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.ds.getPollById(routeParams.pollid)
    });
  }

  pollEnded() {
    this.selectedPoll.status = "ended";
  }
}
