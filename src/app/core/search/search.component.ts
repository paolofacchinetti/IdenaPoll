import {Component, OnInit} from '@angular/core';
import {getFilteredPolls, State} from "@app-redux/index";
import {Store} from "@ngrx/store";
import {PollBean} from "@app-shared/model/poll.bean";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  polls: PollBean[];

  constructor(protected store: Store<State>) {
    this.store.select(getFilteredPolls).subscribe(r => {
      this.polls = r;
    })
  }

  ngOnInit(): void {
  }

}
