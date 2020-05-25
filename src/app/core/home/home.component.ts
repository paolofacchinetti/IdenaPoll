import { Component, OnInit } from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';
import {getPopularPolls, getRecentPolls, State} from '@app-redux/index';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentPolls: PollBean[];
  popularPolls: PollBean[];
  constructor(protected store: Store<State>) {
    this.store.select(getRecentPolls).subscribe((p)=>{
      this.recentPolls = p;
    });
    this.store.select(getPopularPolls).subscribe((j) =>{
      this.popularPolls = j;
    })
    console.log(this.recentPolls);
    console.log(this.popularPolls);
  }

  ngOnInit(): void {

  }

}
