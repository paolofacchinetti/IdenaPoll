import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '@app-redux/index';
import * as moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  pollForm;
  expirationDate;

  constructor(private fb: FormBuilder, protected store: Store<State>) {
    this.expirationDate = moment().add(7, 'days').toDate();
    this.pollForm = this.fb.group({
      title: [''],
      description: [''],
      settings: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('')
      ])
    });
  }

  get options() {
    return this.pollForm.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.control(''));
    setTimeout(() => document.getElementById("option-" + this.options.controls.length).focus(), 0)
  }

  ngOnInit(): void {

  }

  onSubmit(pollData) {

  }

}
