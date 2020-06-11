import {Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {AbstractInputComponent} from "@app-shared/component/input/abstract-input.component";

@Component({
  selector: 'app-alphanumeric-input',
  templateUrl: './alphanumeric-input.component.html',
  styleUrls: ['../abstract-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlphanumericInputComponent extends AbstractInputComponent {

  @ViewChild('inputAlphanumericField') inputAlphanumericField: ElementRef;

  constructor(public viewContainerRef: ViewContainerRef) {
    super(viewContainerRef);
    this.dynamicIconClass = this.iconClass;
  }

  onAutofocus() {
    setTimeout(() => {
      this.inputAlphanumericField.nativeElement.focus();
    }, 200);
  }
}
