import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from "@angular/material/snack-bar";
import {StatusBarComponent} from "@app-shared/component/status-bar/status-bar.component";

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  statusBarReference: MatSnackBarRef<StatusBarComponent>;

  constructor(private matStatusBar: MatSnackBar
  ) {

  }

  openDialogBar(config: MatSnackBarConfig) {
    this.statusBarReference = this.matStatusBar.openFromComponent(StatusBarComponent, config);
  }
}
