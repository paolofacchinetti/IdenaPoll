import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ButtonToggleItem} from '@app-shared/model/button-toggle-item.interface';


@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})

export class ToggleButtonComponent {
  @Input() id: string;
  @Input() parentFormGroup: FormGroup;
  @Input() parentControlName: string;
  @Input() toggleGroupAriaLabel: string;
  @Input() toggleGroupModel?: string;
  @Input() buttonToggleListItem: ButtonToggleItem[];
  @Output() toggleGroupChange = new EventEmitter<any>();
  @Output() toggleItemClick: EventEmitter<ButtonToggleItem> = new EventEmitter<ButtonToggleItem>();


  constructor() {
  }

  onChangeEvent(value?: any) {
    if (this.toggleGroupChange) {
      if (value) {
        this.toggleGroupChange.emit(value);
      } else {
        this.toggleGroupChange.emit(true);
      }
    }
  }

  selectionEvent(item: ButtonToggleItem) {
    if (this.toggleItemClick) {
      this.toggleItemClick.emit(item);
    }
  }

  trackByLabel(index, item) {
    return item.label;
  }

  checkActiveButton(): ButtonToggleItem[] {
    if (this.buttonToggleListItem) {
      const arr = this.buttonToggleListItem.filter(item => {
        return item.isButtonVisible == null || item.isButtonVisible === true;
      });
      if (arr.length === 1) {
        this.parentFormGroup.get(this.parentControlName).setValue(arr[0].value);
      }
      return arr;
    }
  }
}
