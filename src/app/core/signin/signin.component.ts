import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '@app-shared/data.service';
import {State} from '@app-redux/index';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
