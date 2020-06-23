import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getRecentPolls, State} from '@app-redux/index';
import {filter} from 'rxjs/operators';
import {DataService} from '@app-shared/data.service';
import {PollBean, ResultsPollBean} from '@app-shared/model/poll.bean';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-recent-tab',
  templateUrl: './recent-tab.component.html',
  styleUrls: ['./recent-tab.component.scss']
})
export class RecentTabComponent implements OnInit, AfterViewInit {
  public recentPolls: PollBean[];
  resultsOverview = [];

  @ViewChildren('resultsOverview') resultsCanvas: QueryList<any>;

  constructor(protected store: Store<State>, protected ds: DataService) {
    this.ds.getRecentPolls();
    this.store.pipe(select(getRecentPolls), filter((f) => f != null && (f instanceof Array && f.length > 0))).subscribe((p) => {
      this.recentPolls = p;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getRecentPolls), filter((f) => f != null && (f instanceof Array && f.length > 0))).subscribe((j) => {
      this.recentPolls = j;
      setTimeout( () => {
        let canvasArray = this.resultsCanvas.toArray();
        for(let i = 0; i<this.recentPolls.length; i++) {
          let resultsPoll = new ResultsPollBean(this.recentPolls[i]);
          this.resultsOverview.push(new Chart(canvasArray[i].nativeElement.getContext('2d'), {
            type: 'doughnut',
            data: {
              labels: resultsPoll.optionDescriptions,
              datasets: [{
                label: 'Voters',
                data: resultsPoll.optionTotalVotes,
                backgroundColor: [
                  'rgba(33, 150, 243, 1)',
                  'rgba(156, 39, 176, 1)',
                  'rgba(244, 67, 54, 1)',
                  'rgba(76, 175, 80, 1)',
                  'rgba(255, 235, 59, 1)',
                  'rgba(255, 152, 0, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              legend: {
                display: false
              }
            }
          }));
        }
      }, 0);
    });
  }

}
