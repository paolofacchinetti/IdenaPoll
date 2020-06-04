import {Component, Input, OnInit} from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';
import {DataService} from '@app-shared/data.service';
import {openDialogBar} from '@app-shared/open-status-bar.functions';
import {Store} from '@ngrx/store';
import {getSession, State} from '@app-redux/index';

@Component({
  selector: 'app-voting-tab',
  templateUrl: './voting-tab.component.html',
  styleUrls: ['./voting-tab.component.scss']
})
export class VotingTabComponent implements OnInit {
  selectedOption: number;

  @Input() poll: PollBean;

  constructor(protected ds: DataService, protected store: Store<State>) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.ds.getSession();
    this.store.select(getSession).subscribe((s) =>{
      if(s == null){
        openDialogBar(this.store, 'warning', 'You need to Sign-in with an Idena identity before voting.');
      }else{
        this.ds.votePoll(this.poll.id, this.selectedOption);
      }
    });
  }

}
