import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  session= {
    address: '0x3852c4498b329627dd47a587d0de63860313524e'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
