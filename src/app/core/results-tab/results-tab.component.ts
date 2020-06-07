import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PollBean, ResultsPollBean} from '@app-shared/model/poll.bean';
import * as Chart from 'chart.js';
import {DataService} from '@app-shared/data.service';

@Component({
  selector: 'app-results-tab',
  templateUrl: './results-tab.component.html',
  styleUrls: ['./results-tab.component.scss']
})
export class ResultsTabComponent implements OnInit, AfterViewInit{
  resultsPoll: ResultsPollBean;
  resultsOverview;
  optionStatusOverview;
  ageOverview;
  totStatusOverview;

  //COLORS:
  newbieRGB = 'rgba(255, 206, 86, 1)';
  verifiedRGB = 'rgba(255, 99, 132, 1)';
  humanRGB = 'rgba(54, 162, 235, 1)';
  otherRGB = 'rgba(153, 102, 255, 1)';
  @Input() poll: PollBean;
  @ViewChild('resultsOverview', {static: false}) resultsCanvas: ElementRef;
  @ViewChild('optionStatusOverview', {static: false}) optionStatusCanvas: ElementRef;
  @ViewChild('ageOverview', {static: false}) ageCanvas: ElementRef;
  @ViewChild('totStatusOverview', {static: false}) totStatusCanvas: ElementRef;

  constructor(protected ds: DataService) {
  }

  ngOnInit(): void {
    this.ds.getPollById(this.poll.id);
    this.resultsPoll = new ResultsPollBean(this.poll);
  }

  ngAfterViewInit(): void {
    if(this.resultsPoll.poll.settings.isStatusWeighted){
      this.resultsOverview = new Chart(this.resultsCanvas.nativeElement.getContext('2d'), {
        type: 'horizontalBar',
        data: {
          labels: this.resultsPoll.optionDescriptions,
          datasets: [{
            label: 'Votes',
            data: this.resultsPoll.optionTotalWeightedVotes,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Poll Results (Weighted)',
            fontSize: 16
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    } else {
      this.resultsOverview = new Chart(this.resultsCanvas.nativeElement.getContext('2d'), {
        type: 'horizontalBar',
        data: {
          labels: this.resultsPoll.optionDescriptions,
          datasets: [{
            label: 'Votes',
            data: this.resultsPoll.optionTotalVotes,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Poll Results',
            fontSize: 16
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });
    }
    if(this.resultsPoll.poll.settings.isStatusWeighted) {
      this.optionStatusOverview = new Chart(this.optionStatusCanvas.nativeElement.getContext('2d'), {
        type: 'horizontalBar',
        data: {
          labels: this.resultsPoll.optionDescriptions,
          datasets: [{
            label: 'Newbie Votes',
            data: this.resultsPoll.optionNewbieWeightedVotes,
            backgroundColor: [
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB
            ],
            borderColor: [
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB
            ],
            borderWidth: 1
          },
            {
              label: 'Verified Votes',
              data: this.resultsPoll.optionVerifiedWeightedVotes,
              backgroundColor: [
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB
              ],
              borderColor: [
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB
              ],
              borderWidth: 1
            },
            {
              label: 'Human Votes',
              data: this.resultsPoll.optionHumanWeightedVotes,
              backgroundColor: [
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB
              ],
              borderColor: [
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB
              ],
              borderWidth: 1
            }]
        },
        options: {
          title: {
            display: true,
            text: 'Votes by Status (weighted)',
            fontSize: 16
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });
    }else{
      this.optionStatusOverview = new Chart(this.optionStatusCanvas.nativeElement.getContext('2d'), {
        type: 'horizontalBar',
        data: {
          labels: this.resultsPoll.optionDescriptions,
          datasets: [{
            label: 'Newbie Votes',
            data: this.resultsPoll.optionNewbieVotes,
            backgroundColor: [
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB
            ],
            borderColor: [
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB,
              this.newbieRGB
            ],
            borderWidth: 1
          },
            {
              label: 'Verified Votes',
              data: this.resultsPoll.optionVerifiedVotes,
              backgroundColor: [
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB
              ],
              borderColor: [
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB,
                this.verifiedRGB
              ],
              borderWidth: 1
            },
            {
              label: 'Human Votes',
              data: this.resultsPoll.optionHumanVotes,
              backgroundColor: [
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB
              ],
              borderColor: [
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB,
                this.humanRGB
              ],
              borderWidth: 1
            },
            {
              label: 'Other Votes',
              data: this.resultsPoll.optionOtherVotes,
              backgroundColor: [
                this.otherRGB,
                this.otherRGB,
                this.otherRGB,
                this.otherRGB,
                this.otherRGB,
                this.otherRGB
              ],
              borderColor: [
                this.otherRGB,
                this.otherRGB,
                this.otherRGB,
                this.otherRGB,
                this.otherRGB,
                this.otherRGB
              ],
              borderWidth: 1
            }]
        },
        options: {
          title: {
            display: true,
            text: 'Votes by Status',
            fontSize: 16
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });
    }
    this.ageOverview = new Chart(this.ageCanvas.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.resultsPoll.ageLabels,
        datasets: [{
          label: 'Voters',
          data: this.resultsPoll.ageData,
          backgroundColor: this.ageColors,
          borderColor: [],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Total # of Voters by Age',
          fontSize: 16
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });
    if(this.resultsPoll.poll.settings.isStatusWeighted){
      this.totStatusOverview = new Chart(this.totStatusCanvas.nativeElement.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['NEWBIE', 'VERIFIED', 'HUMAN'],
          datasets: [{
            label: 'Voters',
            data: [this.resultsPoll.weightedNewbieVotes, this.resultsPoll.weightedVerifiedVotes, this.resultsPoll.weightedHumanVotes],
            backgroundColor: [
              this.newbieRGB,
              this.verifiedRGB,
              this.humanRGB
            ],
            borderColor: [],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Total Votes by Status (weighted)',
            fontSize: 16
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });
    }else {
      this.totStatusOverview = new Chart(this.totStatusCanvas.nativeElement.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['NEWBIE', 'VERIFIED', 'HUMAN', 'OTHER'],
          datasets: [{
            label: 'Voters',
            data: [this.resultsPoll.totalNewbieVotes, this.resultsPoll.totalVerifiedVotes, this.resultsPoll.totalHumanVotes, this.resultsPoll.totalOtherVotes],
            backgroundColor: [
              this.newbieRGB,
              this.verifiedRGB,
              this.humanRGB,
              this.otherRGB],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Total Votes by Status',
            fontSize: 16
          },
        }
      });
    }
  }

  get ageColors() {
    let colors = [];
    for(let i = 0; i<this.resultsPoll.ageLabels.length; i++){
      colors.push('rgba(56, 182, 50, 1)');
    }
    return colors;
  }
}


