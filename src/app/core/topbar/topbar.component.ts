import {Component, OnInit} from '@angular/core';
import {DataService} from '@app-shared/data.service';
import {select, Store} from '@ngrx/store';
import {getSession, State} from '@app-redux/index';
import {SessionBean} from '@app-shared/model/session.bean';
import {filter} from 'rxjs/operators';
import {StatusEnum} from '@app-shared/model/status.enum';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  session: SessionBean;
  canCreate: boolean;

  constructor(protected dataService: DataService, protected store: Store<State>) {
    this.store.pipe(select(getSession), filter((p) => p != null)).subscribe((s) => {
      this.session = s;
    });
    this.dataService.getSessionOnlyCheck();

    /**
    Conditions for being able to create a new poll
     */
    if(this.session.status==StatusEnum.HUMAN || this.session.status == StatusEnum.VERIFIED){
      this.canCreate = true;
    }else{
      this.canCreate = false;
    }
  }

  ngOnInit(): void {
  }


  vote() {
    this.dataService.votePoll('SDASD1', 0);
  }
}
