import {Component, Input, OnInit} from '@angular/core';
import {PollBean, ResultsPollBean} from '@app-shared/model/poll.bean';

@Component({
  selector: 'app-results-tab',
  templateUrl: './results-tab.component.html',
  styleUrls: ['./results-tab.component.scss']
})
export class ResultsTabComponent implements OnInit {
  resultsPoll: ResultsPollBean;


  @Input() poll: PollBean;

  constructor() {

  }

  ngOnInit(): void {
    this.resultsPoll = new ResultsPollBean(this.poll);
    console.log('WEIGHTED POLL:');
    console.log(this.resultsPoll);
  }

}
