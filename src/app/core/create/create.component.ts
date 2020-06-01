import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '@app-redux/index';
import * as moment from 'moment';
import {MatSnackBarConfig} from '@angular/material/snack-bar';
import {openStatusBar} from '@app-redux/core.actions';
import {isNullOrEmpty} from '@app-shared/format.functions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  checkboxBool: boolean;
  pollForm;
  expirationDate;
  toggleList = [
    {value: 'NEWBIE', label: 'Newbie'},
    {value: 'VERIFIED', label: 'Verified'},
    {value: 'HUMAN', label: 'Human'}
  ];

  constructor(private fb: FormBuilder, protected store: Store<State>) {
    this.expirationDate = moment().add(7, 'days').toDate();
    this.pollForm = this.fb.group({
      title: ['', [Validators.required]],
      desc: [''],
      settings: this.fb.group({
        statusRequirement: [''],
        voteWeight: this.fb.group({
          newbieWeight: [''],
          verifiedWeight: [''],
          humanWeight: ['']
        })
      }),
      options: this.fb.array([
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required])
      ])
    });
  }

  openDialogBar(typeDialogBar: string, titleValue: string) {
    const config: MatSnackBarConfig = {
      data: {
        title: titleValue,
        icon: '',
        type: typeDialogBar
      }
    };
    this.store.dispatch(openStatusBar({value: config}));
  }

  get options() {
    return this.pollForm.get('options') as FormArray;
  }

  get settings() {
    return this.pollForm.get('settings') as FormGroup;
  }

  get voteWeight(){
    return this.pollForm.get('settings').get('voteWeight') as FormGroup;
  }

  onSubmit() {
    if (this.pollForm.valid) {
      console.log('Valid');
    } else {
      this.openDialogBar('error', 'Please fill in the required fields of the form.');
    }
  }

  selectMode() {
  }

  addOption() {
    if (this.options.length < 6) {
      this.options.push(this.fb.control(''));
      setTimeout(() => document.getElementById('option-' + this.options.controls.length).focus(), 0);
    }
  }

  ngOnInit(): void {

  }

}
