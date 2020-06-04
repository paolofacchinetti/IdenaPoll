import {Component, Input, OnInit} from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';

@Component({
  selector: 'app-results-tab',
  templateUrl: './results-tab.component.html',
  styleUrls: ['./results-tab.component.scss']
})
export class ResultsTabComponent implements OnInit {

  @Input() poll: PollBean;

  constructor() { }

  ngOnInit(): void {
  }

}
