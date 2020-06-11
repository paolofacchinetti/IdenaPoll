import {EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';


export abstract class AbstractInputComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() parentFormGroup: FormGroup;
  @Input() parentControlName: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() inputSize = '56px';
  @Input() inputLabel?: string;
  @Input() placeholder?: string;
  @Input() minLength?: string;
  @Input() maxLength?: string;
  @Input() icon?: string;
  @Input() iconClass?: string;
  @Input() inputInTable = false;

  @Input() leftHint?: string;
  @Input() rightHint?: string;

  @Output() blurEvent = new EventEmitter<boolean>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() iconClickEvent = new EventEmitter();

  @HostBinding('class.app-input') readonly definingClass = true;
  focusIconClass = 'icon-lightblue';
  dynamicIconClass: string;

  protected constructor(public viewContainerRef: ViewContainerRef) {
    this.dynamicIconClass = this.iconClass;
  }

  @HostBinding('class.without-hint') get isWithoutHint() {
    return (this.leftHint == null || this.rightHint == null);
  }

  @HostBinding('class.is-in-table') get isInTable() {
    return (this.inputInTable === true);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.blurEvent.unsubscribe();
    this.keydownEvent.unsubscribe();
    this.iconClickEvent.unsubscribe();
  }

  onBlur() {
    this.blurEvent.emit(true);
  }

  onKeydown(event: KeyboardEvent) {
    this.keydownEvent.emit(event);
  }

  onClick() {
    this.iconClickEvent.emit();
  }

  onInputFocus() {
    this.dynamicIconClass = this.focusIconClass;
  }

  onInputFocusOut() {
    this.dynamicIconClass = this.iconClass;
  }

  onAutofocus() {
  }


}
