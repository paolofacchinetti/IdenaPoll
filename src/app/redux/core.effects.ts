import {StatusBarService} from "@app-shared/status-bar.service";
import {Store} from "@ngrx/store";
import {State} from "@app-redux/index";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable()
export class CoreEffects {
  dialogDismiss = createEffect(() => this.actions$.pipe(
    ofType('[Core] dismissStatusBar'),
    tap(() => this.dialogBarService.statusBarReference.dismiss())),
    {dispatch: false}
  );
  openDialogBar = createEffect(() => this.actions$.pipe(
    ofType('[Core] openStatusBar'),
    tap((action: { type: '[Core] openStatusBar', value: MatSnackBarConfig }) => {
      this.dialogBarService.openDialogBar(action ? action.value : null);
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private appState$: Store<State>,
    private dialogBarService: StatusBarService,
  ) {
  }
}
