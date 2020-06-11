import {Component, Input, OnInit} from '@angular/core';
import {PollBean} from "@app-shared/model/poll.bean";

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  @Input() list: PollBean[]

  constructor() {
  }

  ngOnInit(): void {
  }

}
