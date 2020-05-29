import {Component, ElementRef, HostBinding, Input, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {AbstractInputComponent} from "@app-shared/component/input/abstract-input.component";

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['../abstract-input.component.scss', './numeric-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumericInputComponent extends AbstractInputComponent {

  @Input() maxValue: string;
  @Input() minValue: string;
  @Input() valueAlignedToRight = false;

  @ViewChild('inputNumberField') inputNumberField: ElementRef;

  constructor(public viewContainerRef: ViewContainerRef) {
    super(viewContainerRef);
    this.dynamicIconClass = this.iconClass;
  }

  @HostBinding('class.is-in-table') get dataInTable() {
    return this.valueAlignedToRight;
  }

  // questa funzione gestisce il trasferimento del focus dal'componente custom all'elemento di input appropriato.
  onAutofocus() {
    setTimeout(() => {
      this.inputNumberField.nativeElement.focus();
    }, 200);
  }
}
