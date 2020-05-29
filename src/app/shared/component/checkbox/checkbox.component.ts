import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  readonly change: EventEmitter<MatCheckboxChange>;
  @Input() name: string | null;
  @Input() id?: string;

  @Input() label?: string;

  @Input() disabledCondition?: boolean;
  @Input() checked: boolean;
  @Input() checkboxValue?: boolean;
  @Input() checkboxName: any;
  @Output() checkboxValueChange = new EventEmitter<any>();
  @Output() eventClick = new EventEmitter<any>();
  @Output() changeWithoutModel = new EventEmitter();

  constructor() {
  }

  eventChange() {
    this.checkboxValueChange.emit(this.checkboxValue);
  }

  checkBoxClick(event) {
    this.eventClick.emit(event);
  }

  eventChangeWithoutModel(event) {
    this.changeWithoutModel.emit(event);
  }
}
