import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '@app-redux/index';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  headerForm;
  optionForm;
  settingForm;

  constructor(private formBuilder: FormBuilder, protected store: Store<State>) {
    this.headerForm = this.formBuilder.group({
      title: ['Title / Question'],
      description: ['Description']
    });
    this.optionForm = this.formBuilder.group({
      option_0: ['Option 1'],
      option_1: ['Option 2']
    });
    console.log(this.optionForm);
  }

  ngOnInit(): void {

  }

  onSubmit(pollData) {

  }

}
