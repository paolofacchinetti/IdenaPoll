import {Component, OnInit} from '@angular/core';
import {PollBean} from "@app-shared/model/poll.bean";
import {Store} from "@ngrx/store";
import {getFilteredPolls, State} from "@app-redux/index";

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.component.html',
  styleUrls: ['./mypolls.component.scss']
})
export class MypollsComponent implements OnInit {
  polls: PollBean[];

  constructor(protected store: Store<State>) {
    this.store.select(getFilteredPolls).subscribe(r => {
      this.polls = r;
    })
  }

  ngOnInit(): void {
  }

}
