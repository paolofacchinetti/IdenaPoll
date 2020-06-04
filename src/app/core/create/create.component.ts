import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getSession, State} from '@app-redux/index';
import * as moment from 'moment';
import {StatusEnum} from '@app-shared/model/status.enum';
import {OptionBean, PollBean, SettingsBean} from '@app-shared/model/poll.bean';
import {openDialogBar} from '@app-shared/open-status-bar.functions';
import {isNullOrEmpty} from '@app-shared/format.functions';
import {DataService} from '@app-shared/data.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  checkboxWeight: boolean = false;
  checkboxAge: boolean = false;
  pollForm;
  prevStatus: string = '';
  expirationDate;
  pollCreator: string;
  toggleList = [
    {value: 'NEWBIE', label: 'Newbie'},
    {value: 'VERIFIED', label: 'Verified'},
    {value: 'HUMAN', label: 'Human'}
  ];

  constructor(private fb: FormBuilder, protected store: Store<State>, protected ds: DataService) {
    this.store.pipe(select(getSession), filter((f) => f != null)).subscribe((s) => {
      this.pollCreator = s.address;
    });
    this.expirationDate = moment().add(7, 'days').toDate().getTime();
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
      openDialogBar(this.store, 'error', 'Please fill in the required fields of the form.');
    } else {
      openDialogBar(this.store, 'info', 'Processing poll creation, please wait...');
      const poll = new PollBean();
      poll.title = this.pollForm.get('title').value;
      poll.description = this.pollForm.get('desc').value;
      poll.creator = this.pollCreator;
      poll.status = 'active';
      const days = parseInt(this.expiration.get('days').value);
      const hours = parseInt(this.expiration.get('hours').value);
      const minutes = parseInt(this.expiration.get('minutes').value);
      poll.endsAt = moment().add(days, 'days').add(hours, 'hours').add(minutes, 'minutes').toDate();
      let count = 0;
      for (let op of this.options.controls) {
        if (!isNullOrEmpty(op.value)) {
          const option = new OptionBean();
          option.description = op.value;
          option.value = count.toString();
          poll.options.push(option);
          count++;
        }
      }
      const settings = new SettingsBean();
      settings.ageRequirement = this.settings.get('ageReq').value;
      settings.statusRequirement = this.settings.get('statusRequirement').value;
      settings.isStatusWeighted = this.checkboxWeight;
      if (this.checkboxWeight) {
        settings.newbieWeight = this.voteWeight.get('newbieWeight').value;
        settings.verifiedWeight = this.voteWeight.get('verifiedWeight').value;
        settings.humanWeight = this.voteWeight.get('humanWeight').value;
      }
      poll.settings = settings;
      console.log(poll);
      this.ds.createPoll(poll);
    }
  }

  valuereseter() {
    const status = this.settings.get('statusRequirement').value;
    if (status === this.prevStatus) {
      this.settings.get('statusRequirement').reset();
      this.prevStatus = '';
    } else {
      this.prevStatus = status;
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
