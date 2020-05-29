import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/** This component accepts an array of 2 elements optionList = {value: '', label ''} and represents a custom
 *  solution to a bug in the dropdown dynamic styling */

export class DropdownComponent implements AfterViewInit, OnChanges {
  @Input() formFieldClass: string;
  @Input() parentFormGroup: FormGroup;
  @Input() parentControlName: string;
  @Input() label?: string;
  @Input() id: string;
  @Input() formFieldId?: string;
  @Input() autocompleteRefName: string;
  @Input() placeholder?: string;
  @Input() optionList: Array<any>;
  @Input() requiredCondition = false;
  @Input() disabledCondition = false;
  @Input() tabindex = 0;
  @Input() model: any;
  @Input() isTableFilter = false;
  showDropDown: boolean;

  @Input()
  getValue?: (item?: any) => string | undefined;

  @Output() modelChange = new EventEmitter<any>();
  @Output() iconClick = new EventEmitter<MouseEvent>();
  @Output() inputClick = new EventEmitter<MouseEvent>();
  @Output() optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();

  @ViewChild('appAutocomplete', {read: MatAutocompleteTrigger}) autoComplete: MatAutocompleteTrigger;

  @HostBinding('class.app-dropdown') readonly definingClass = true;
  parentValidationError: string;

  constructor(
    private cdr: ChangeDetectorRef
  ) {

  }

  @HostBinding('class.app-table-filter') get tableFilter() {
    return this.isTableFilter;
  }

  ngAfterViewInit(): void {
    if (this.model) {
      let found = false;
      for (const option of this.optionList) {
        if (this.model === option.value) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.model = this.optionList[0].value;
      }
    }
    this.cdr.detectChanges();
    if (this.parentFormGroup) {
      this.parentFormGroup.get(this.parentControlName).valueChanges.pipe().subscribe(val => {
        if (val === '' || val == null) {
          this.autoComplete.autocomplete.options.forEach(item => item.deselect());
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['disabled'] && changes['disabled'].currentValue !== changes['disabled'].previousValue) {
      if (this.disabledCondition && this.parentFormGroup && this.parentControlName) {
        this.parentFormGroup.get(this.parentControlName).disable();
      } else {
        this.parentFormGroup.get(this.parentControlName).enable();
      }
    }
  }

  onInputFocusOut() {
    this.showDropDown = false;
  }

  displayFn(option: any) {
    if (this.optionList && option !== undefined || this.optionList && option === '') {
      const match = this.optionList.find(item => {
        return this.optionValue(item.value) === option;
      });
      return match ? (match.label !== '' ? match.label : '') : undefined;
    }
    return undefined;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event);
    this.modelChange.emit(this.model);
  }

  preventInput(event: KeyboardEvent) {
    const key = event.key;
    if (key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'Tab' && key !== 'Enter' && key !== 'Esc' &&
      key !== 'BackSpace' && key !== 'Del') {
      event.preventDefault();
    }
  }

  trackByFn(index) {
    return index;
  }

  optionValue(option: any): string | undefined {
    return this.getValue ? this.getValue(option) : option;
  }
}
