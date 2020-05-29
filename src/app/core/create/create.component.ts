import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '@app-redux/index';
import * as moment from 'moment';
import {MatSnackBarConfig} from "@angular/material/snack-bar";
import {openStatusBar} from "@app-redux/core.actions";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  pollForm;
  expirationDate;
  optionList = [
    {value: 'HUMAN', label: 'Human'},
    {value: 'VERIFIED', label: 'Verified'}
  ];
  toggleList = [
    {value: 'HUMAN', label: 'Human'},
    {value: 'VERIFIED', label: 'Verified'}
  ];

  constructor(private fb: FormBuilder, protected store: Store<State>) {
    this.expirationDate = moment().add(7, 'days').toDate();
    this.pollForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      settings: this.fb.group({
        // ADD SETTINGS
      }),
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('')
      ])
    });
  }

  openDialogBar(tipoDialogBar: string) {
    const config: MatSnackBarConfig = {
      data: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: '',
        type: tipoDialogBar
      }
    };
    this.store.dispatch(openStatusBar({value: config}));
  }

  get options() {
    return this.pollForm.get('options') as FormArray;
  }

  selectMode() {
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
