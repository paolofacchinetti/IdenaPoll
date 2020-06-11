import {MatSnackBarConfig} from "@angular/material/snack-bar";
import {openStatusBar} from "@app-redux/core.actions";
import {State} from "@app-redux/index";
import {Store} from "@ngrx/store";

export function openDialogBar(store: Store<State>, typeDialogBar: string, titleValue: string, stayopen = false) {
  const config: MatSnackBarConfig = {
    data: {
      title: titleValue,
      icon: '',
      type: typeDialogBar
    }
  };
  store.dispatch(openStatusBar({value: config, stayopen: stayopen}));
}
