import {Component, HostBinding, Inject, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {StatusBarItem} from "@app-shared/model/status-bar-item.interface";
import {State} from "@app-redux/index";
import {dismissStatusBar} from "@app-redux/core.actions";


@Component({
  selector: 'popso-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatusBarComponent {
  itemTitle: string;
  itemType: string;

  @HostBinding('class.popso-statusbar') readonly definingClass = true;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: StatusBarItem,
    private appState$: Store<State>
  ) {
    this.itemTitle = data.title;

    this.itemType = data.type ? data.type : 'info';
  }

  dismiss() {
    this.appState$.dispatch(dismissStatusBar({}));
  }
}
