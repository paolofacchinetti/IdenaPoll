import {Component, Input, ViewEncapsulation} from '@angular/core';

/**
 * Componente generico Circle Status
 * @typedef {Object} CircleStatusComponent
 */
@Component({
  selector: 'app-circle-status',
  templateUrl: './circle-status.component.html',
  styleUrls: ['./circle-status.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CircleStatusComponent {
  @Input() label: string;
  @Input() isSemibold = false;

  constructor() {
  }

  checkLabel(): boolean {
    return this.label && this.label.length !== 0;
  }
}
