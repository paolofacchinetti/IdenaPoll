import {Component, Input, OnInit} from '@angular/core';
import {PollBean} from '@app-shared/model/poll.bean';
import {DataService} from '@app-shared/data.service';
import {openDialogBar} from '@app-shared/open-status-bar.functions';
import {Store} from '@ngrx/store';
import {getSession, State} from '@app-redux/index';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {endSelectedPoll} from "@app-redux/core.actions";

@Component({
  selector: 'app-voting-tab',
  templateUrl: './voting-tab.component.html',
  styleUrls: ['./voting-tab.component.scss']
})
export class VotingTabComponent implements OnInit {
  selectedOption: number;
  session;
  href: string = "";
  baseURL = 'https://idenapoll.com';
  copyURLForm;
  @Input() poll: PollBean;

  constructor(private router: Router, protected ds: DataService, protected store: Store<State>, private fb: FormBuilder) {
    this.store.select(getSession).subscribe((s) => {
      this.session = s;
    });
    this.href = this.baseURL + this.router.url;
    this.copyURLForm = this.fb.group({
      url: [this.href]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.session == null) {
      openDialogBar(this.store, 'warning', 'You need to Sign-in with an Idena identity before voting.');
    } else {
      this.ds.votePoll(this.poll.id, this.selectedOption);
    }
  }


  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.href));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  pollEnded() {
    this.store.dispatch(endSelectedPoll({}))
  }

  tweetPopup(e) {
    window.open(
      e.getAttribute("href"),
      "twitterwindow",
      "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0,scrollbars=0"
    );
  }
}
