import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '@app-redux/index';
import * as moment from 'moment';
import {MatSnackBarConfig} from '@angular/material/snack-bar';
import {openStatusBar} from '@app-redux/core.actions';
import {StatusEnum} from '@app-shared/model/status.enum';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  checkboxBool: boolean = false;
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
          newbieWeight: new FormControl({value: '', disabled: true}, [Validators.required]),
          verifiedWeight: new FormControl({value: '', disabled: true}, [Validators.required]),
          humanWeight: new FormControl({value: '', disabled: true}, [Validators.required])
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

  get voteWeight() {
    return this.settings.get('voteWeight') as FormGroup;
  }

  onSubmit() {
    console.log(this.checkboxBool);
    if (this.pollForm.valid) {
      console.log(this.pollForm);
    } else {
      this.openDialogBar('error', 'Please fill in the required fields of the form.');
    }
  }

  statusSelected() {
    const status = this.settings.get('statusRequirement').value;
    if (status === StatusEnum.NEWBIE && this.checkboxBool) {
      this.voteWeight.get('newbieWeight').enable();
      this.voteWeight.get('verifiedWeight').enable();
      this.voteWeight.get('humanWeight').enable();
    } else if (status === StatusEnum.VERIFIED && this.checkboxBool) {
      this.voteWeight.get('newbieWeight').disable();
      this.voteWeight.get('verifiedWeight').enable();
      this.voteWeight.get('humanWeight').enable();
    } else if (status === StatusEnum.HUMAN && this.checkboxBool) {
      this.voteWeight.get('newbieWeight').disable();
      this.voteWeight.get('verifiedWeight').disable();
      this.voteWeight.get('humanWeight').enable();
    }
  }

  addOption() {
    if (this.options.length < 6) {
      this.options.push(this.fb.control(''));
      setTimeout(() => document.getElementById('option-' + this.options.controls.length).focus(), 0);
    }
  }

  ngOnInit(): void {

  }

  weightedVotes() {
    setTimeout(() => {
      if (this.checkboxBool) {
        this.statusSelected();
      } else {
        this.voteWeight.get('newbieWeight').disable();
        this.voteWeight.get('verifiedWeight').disable();
        this.voteWeight.get('humanWeight').disable();
      }
    }, 0);
  }
}
