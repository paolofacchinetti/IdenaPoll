import {Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {AbstractInputComponent} from '@app-shared/component/input/abstract-input.component';


declare type InputType = 'text' | 'number' | 'alphanumeric';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['../abstract-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent extends AbstractInputComponent {

  @ViewChild('inputTextField') inputTextField: ElementRef;

  constructor(public viewContainerRef: ViewContainerRef) {
    super(viewContainerRef);
    this.dynamicIconClass = this.iconClass;
  }


  onAutofocus() {
    setTimeout(() => {
      this.inputTextField.nativeElement.focus();
    }, 200);
  }

}
