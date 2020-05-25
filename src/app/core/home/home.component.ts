import { Component, OnInit } from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentPolls: PollBean[];
  constructor() { }

  ngOnInit(): void {
  }

}
