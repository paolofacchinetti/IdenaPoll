import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "@app-shared/data.service";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  constructor(protected route: ActivatedRoute, protected ds: DataService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.ds.getPollById(routeParams.pollid)
    });
  }

}
