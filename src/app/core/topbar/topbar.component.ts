import { Component, OnInit } from '@angular/core';
import {DataService} from '@app-shared/data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  // session= {
  //   address: '0x3852c4498b329627dd47a587d0de63860313524e'
  // };
session:any;
  constructor(protected dataService: DataService) {
    console.log(this.dataService.getActivePolls());
  }

  ngOnInit(): void {
  }

}
