import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() date: Date;
  @Input() reverse: boolean;
  diff: number;
  timer: any;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.reverse)
      this.timer = setInterval(() => {
        this.diff = Math.floor((this.date.getTime() - new Date().getTime()) / 1000);
        this.getTimers();
      }, 1000);
    else
      this.timer = setInterval(() => {
        this.diff = Math.floor((new Date().getTime() - this.date.getTime()) / 1000);
        this.getTimers();
      }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

  getTimers() {
    if (this.diff > 0) {
      this.days = Math.floor(this.diff / 86400);
      this.diff -= this.days * 86400;
      this.hours = Math.floor(this.diff / 3600) % 24;
      this.diff -= this.hours * 3600;
      this.minutes = Math.floor(this.diff / 60) % 60;
      this.diff -= this.minutes * 60;
      this.seconds = this.diff % 60;
    }
  }
}
