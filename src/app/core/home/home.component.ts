import { Component, OnInit } from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';
import {DataService} from '@app-shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentPolls: PollBean[];
  popularPolls: PollBean[];
  constructor(protected ds: DataService) {
    this.recentPolls = ds.getRecentPolls();
    this.popularPolls = ds.getPopularPolls();
  }

  ngOnInit(): void {

  }

}
