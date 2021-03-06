import {Component, OnInit} from '@angular/core';
import {DataService} from '@app-shared/data.service';
import {select, Store} from '@ngrx/store';
import {getSession, State} from '@app-redux/index';
import {SessionBean} from '@app-shared/model/session.bean';
import {filter} from 'rxjs/operators';
import {StatusEnum} from '@app-shared/model/status.enum';
import {setSession} from '@app-redux/core.actions';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {signinUrl} from "@app-shared/signin-url.function";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  session: SessionBean;
  canCreate: boolean;
  search: FormGroup;

  constructor(protected dataService: DataService, protected store: Store<State>, protected fb: FormBuilder, protected router: Router) {
    this.store.pipe(select(getSession), filter((p) => p !== null)).subscribe((s) => {
      this.session = s;
      /**
       Conditions for being able to create a new poll
       */
      this.canCreate = this.session.status == StatusEnum.HUMAN || this.session.status == StatusEnum.VERIFIED || this.session.status == StatusEnum.SUSPENDED;
    });
    this.search = this.fb.group({
      searchbar: ['']
    });
    this.dataService.getSessionOnlyCheck();
    setTimeout(() => this.dataService.getSessionOnlyCheck(), 5000);

  }

  ngOnInit(): void {

  }

  logout() {
    this.dataService.logoutSession();
    this.store.dispatch(setSession({value: undefined}));
  }

  searchByWords() {
    this.dataService.getPollByWords(this.search.get('searchbar').value);
  }

  createdBy() {
    this.dataService.getPollsCreatedBy();
  }

  reSign() {
    this.router.navigateByUrl('/signin');
    if (this.router.url === '/signin') {
      signinUrl(this.store, this.dataService);
    }
  }
}
