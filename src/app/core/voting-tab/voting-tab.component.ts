import {Component, Input, OnInit} from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';
import {DataService} from '@app-shared/data.service';

@Component({
  selector: 'app-voting-tab',
  templateUrl: './voting-tab.component.html',
  styleUrls: ['./voting-tab.component.scss']
})
export class VotingTabComponent implements OnInit {
  selectedOption: number;

  @Input() poll: PollBean;

  constructor(protected ds: DataService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.ds.votePoll(this.poll.id, this.selectedOption);
  }

}
