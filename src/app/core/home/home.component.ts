import { Component, OnInit } from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';
import {getPopularPolls, getRecentPolls, State} from '@app-redux/index';
import {select, Store} from '@ngrx/store';
import {DataService} from '@app-shared/data.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentPolls: PollBean[];
  popularPolls: PollBean[];
  constructor(protected store: Store<State>, protected ds: DataService) {
    this.ds.getActivePolls();
    this.ds.getRecentPolls();
    this.store.pipe(select(getRecentPolls), filter((f)=> (f instanceof Array && f.length>0) && f != null)).subscribe((p)=>{
      this.recentPolls = p;
      console.log(this.recentPolls);
    });
    this.store.pipe(select(getPopularPolls), filter((f) => (f instanceof Array && f.length>0) && f != null)).subscribe((j) =>{
      this.popularPolls = j;
      console.log(this.popularPolls);
    });
  }

  ngOnInit(): void {

  }

}
