import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ButtonToggleItem} from "@app-shared/model/button-toggle-item.interface";


@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})

export class ToggleButtonComponent {
  /**
   * @property {string} id
   * Proprietà di @Input().
   * Identificatore del ButtonGroup
   */
  @Input() id: string;
  /**
   * @property {FormGroup} parentFormGroup
   * Proprietà di @Input().
   * Referenza al Form in cui è inittato il componente
   */
  @Input() parentFormGroup: FormGroup;
  /**
   * @property {string} parentControlName
   * Proprietà di @Input().
   * Referenza ad uno specifico FormControlName
   */
  @Input() parentControlName: string;
  /**
   * @property {string} toggleGroupAriaLabel
   * Proprietà di @Input().
   */
  @Input() toggleGroupAriaLabel: string;
  /**
   * @property {string} toggleGroupModel
   * Proprietà di @Input().
   */
  @Input() toggleGroupModel?: string;
  /**
   * @property {ButtonToggleItem[]} buttonToggleListItem
   * Proprietà di @Input().
   */
  @Input() buttonToggleListItem: ButtonToggleItem[];
  @Output() toggleGroupChange = new EventEmitter<any>();
  @Output() toggleItemClick: EventEmitter<ButtonToggleItem> = new EventEmitter<ButtonToggleItem>();

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * @param {any} [value] - parametro opzionale
   * Funzione che permette di gestire l'onChange del ButtonGroup
   */
  onChangeEvent(value?: any) {
    if (this.toggleGroupChange) {
      if (value) {
        this.toggleGroupChange.emit(value);
      } else {
        this.toggleGroupChange.emit(true);
      }
    }
  }

  /**
   * @param {ButtonToggleItem} item - parametro obbligatorio - singolo Button estratto dalla lista
   * Funzione che viene richiamata al click del Button
   */
  selectionEvent(item: ButtonToggleItem) {
    if (this.toggleItemClick) {
      this.toggleItemClick.emit(item);
    }
  }

  /**
   * @param {any} index
   * @param {any} item
   *  Funzione che identifica ogni singolo item della lista
   */
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
