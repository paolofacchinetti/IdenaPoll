import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './topbar/topbar.component';
import {FlexModule} from '@angular/flex-layout';
import {SigninComponent} from './signin/signin.component';
import {SharedModule} from '@app-shared/shared.module';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {CreateComponent} from './create/create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PollComponent} from './poll/poll.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PopularTabComponent} from './popular-tab/popular-tab.component';
import {RecentTabComponent} from './recent-tab/recent-tab.component';
import {VotingTabComponent} from './voting-tab/voting-tab.component';
import {ResultsTabComponent} from './results-tab/results-tab.component';
import {MatRadioModule} from '@angular/material/radio';
import {CountdownComponent} from './countdown/countdown.component';
import {PollListComponent} from './poll-list/poll-list.component';
import {SearchComponent} from './search/search.component';
import {MypollsComponent} from './mypolls/mypolls.component';
import {AboutComponent} from './about/about.component';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [TopbarComponent, SigninComponent, HomeComponent, CreateComponent, PollComponent, PopularTabComponent, RecentTabComponent, VotingTabComponent, ResultsTabComponent, CountdownComponent, PollListComponent, SearchComponent, MypollsComponent, AboutComponent],
  exports: [
    TopbarComponent
  ],
    imports: [
        CommonModule,
        FlexModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatRadioModule,
        MatDividerModule,
    ],
  providers: [FormsModule]
})
export class CoreModule { }
