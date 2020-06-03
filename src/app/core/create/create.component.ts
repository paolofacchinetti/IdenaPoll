import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {getSession, State} from '@app-redux/index';
import * as moment from 'moment';
import {MatSnackBarConfig} from '@angular/material/snack-bar';
import {openStatusBar} from '@app-redux/core.actions';
import {StatusEnum} from '@app-shared/model/status.enum';
import {PollBean} from '@app-shared/model/poll.bean';
import {SessionBean} from '@app-shared/model/session.bean';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  checkboxWeight: boolean = false;
  checkboxAge: boolean = false;
  pollForm;
  expirationDate;
  pollCreator: string;
  toggleList = [
    {value: 'NEWBIE', label: 'Newbie'},
    {value: 'VERIFIED', label: 'Verified'},
    {value: 'HUMAN', label: 'Human'}
  ];

  constructor(private fb: FormBuilder, protected store: Store<State>) {
    this.store.select(getSession).subscribe((s) => {
      this.pollCreator = s.address;
    });
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
        }),
        expiration: this.fb.group({
          days: ['7', [Validators.required]],
          hours: ['0', [Validators.required]],
          minutes: ['0', [Validators.required]]
        }),
        ageReq: new FormControl({value: '', disabled: true}, [Validators.required])
      }),
      options: this.fb.array([
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required])
      ])
    });
  }

  ngOnInit(): void {
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

  get expiration() {
    return this.settings.get('expiration') as FormGroup;
  }

  get settings() {
    return this.pollForm.get('settings') as FormGroup;
  }

  get voteWeight() {
    return this.settings.get('voteWeight') as FormGroup;
  }

  onSubmit() {
    if (!this.pollForm.valid) {
      this.openDialogBar('error', 'Please fill in the required fields of the form.');
    } else {
      this.openDialogBar('info', 'Processing poll creation, please wait...');
      const poll = new PollBean();
      poll.title = this.pollForm.title;
      poll.description = this.pollForm.desc;
      poll.creator = this.pollCreator;
      poll.status = 'active';
      const days = this.pollForm.settings.expiration.days * 24 * 60 * 60 * 1000;
      const hours = this.pollForm.settings.expiration.days * 60 * 60 * 1000;
      const minutes = this.pollForm.settings.expiration.days * 60 * 1000;
      poll.endsAt = moment().add(days).add(hours).add(minutes).toDate();
    }
  }

  statusSelected() {
    const status = this.settings.get('statusRequirement').value;
    if (status === StatusEnum.NEWBIE && this.checkboxWeight) {
      this.voteWeight.get('newbieWeight').enable();
      this.voteWeight.get('verifiedWeight').enable();
      this.voteWeight.get('humanWeight').enable();
    } else if (status === StatusEnum.VERIFIED && this.checkboxWeight) {
      this.voteWeight.get('newbieWeight').disable();
      this.voteWeight.get('newbieWeight').reset();
      this.voteWeight.get('verifiedWeight').enable();
      this.voteWeight.get('humanWeight').enable();
    } else if (status === StatusEnum.HUMAN && this.checkboxWeight) {
      this.voteWeight.get('newbieWeight').disable();
      this.voteWeight.get('newbieWeight').reset();
      this.voteWeight.get('verifiedWeight').disable();
      this.voteWeight.get('verifiedWeight').reset();
      this.voteWeight.get('humanWeight').enable();
    }
  }

  weightedVotes() {
    setTimeout(() => {
      if (this.checkboxWeight) {
        this.statusSelected();
      } else {
        this.voteWeight.get('newbieWeight').disable();
        this.voteWeight.get('newbieWeight').reset();
        this.voteWeight.get('verifiedWeight').disable();
        this.voteWeight.get('verifiedWeight').reset();
        this.voteWeight.get('humanWeight').disable();
        this.voteWeight.get('humanWeight').reset();
      }
    }, 0);
  }

  addOption() {
    if (this.options.length < 6) {
      this.options.push(this.fb.control(''));
      setTimeout(() => document.getElementById('option-' + this.options.controls.length).focus(), 0);
    }
  }

  minimumAge() {
    setTimeout(() => {
      if (this.checkboxAge) {
        this.settings.get('ageReq').enable();
      } else {
        this.settings.get('ageReq').disable();
        this.settings.get('ageReq').reset();
      }
    }, 0);
  }
}
