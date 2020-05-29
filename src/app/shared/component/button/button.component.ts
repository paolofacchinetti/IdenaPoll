import {Component, HostBinding, Input, ViewChild, ViewEncapsulation} from '@angular/core';


import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() id: string;
  @Input() label = '';
  @Input() fontIcon?: string;
  @Input() disabledCondition: boolean;
  @ViewChild(MatButton) button: MatButton;

  constructor() {
  }

  @HostBinding('class.icon-on-left') get hasIconOnLeft() {
    return this.fontIcon;
  }

  @HostBinding('class.icon-on-right') get hasIconOnRight() {
    return !this.fontIcon;
  }

  focus() {
    if (this.button) {
      setTimeout(() => {
        this.button.focus();
      }, 10);
    }
  }
}
