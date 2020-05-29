import {StatusBarService} from "@app-shared/status-bar.service";
import {Store} from "@ngrx/store";
import {State} from "@app-redux/index";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {openStatusBar} from "@app-redux/core.actions";

@Injectable()
export class CoreEffects {
  dialogDismiss = createEffect(() => this.actions$.pipe(
    ofType('[Core] dismissStatusBar'),
    tap(() => this.dialogBarService.statusBarReference.dismiss())),
    {dispatch: false}
  );
  openDialogBar = createEffect(() => this.actions$.pipe(
    ofType('[Core] openStatusBar'),
    tap((action: openStatusBar.type) => {
      this.dialogBarService.openDialogBar(action.value);
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private appState$: Store<State>,
    private dialogBarService: StatusBarService,
  ) {
  }
}
