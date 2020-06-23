import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getPopularPolls, State} from '@app-redux/index';
import {filter} from 'rxjs/operators';
import {DataService} from '@app-shared/data.service';
import {PollBean, ResultsPollBean} from '@app-shared/model/poll.bean';
import {endActivePoll} from "@app-redux/core.actions";
import * as Chart from 'chart.js';

@Component({
  selector: 'app-popular-tab',
  templateUrl: './popular-tab.component.html',
  styleUrls: ['./popular-tab.component.scss']
})
export class PopularTabComponent implements OnInit, AfterViewInit{
  public popularPolls: PollBean[];
  resultsOverview = [];

  @ViewChildren('resultsOverview') resultsCanvas: QueryList<any>;

  constructor(protected store: Store<State>, protected ds: DataService) {
    this.ds.getActivePolls();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getPopularPolls), filter((f) => f != null && (f instanceof Array && f.length > 0))).subscribe((j) => {
      this.popularPolls = j;
      setTimeout( () => {
        let canvasArray = this.resultsCanvas.toArray();
        for(let i = 0; i<this.popularPolls.length; i++) {
          let resultsPoll = new ResultsPollBean(this.popularPolls[i]);
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


  pollEnded(id: string) {
    this.store.dispatch(endActivePoll({value: id}))
  }
}
