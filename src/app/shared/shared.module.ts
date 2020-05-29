import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import * as fromCore from "@app-redux/core.reducers";
import {InputComponent} from "@app-shared/component/input/unfiltered-input/input.component";
import {NumericInputComponent} from "@app-shared/component/input/numeric-input/numeric-input.component";
import {AlphanumericInputComponent} from "@app-shared/component/input/alphanumeric-input/alphanumeric-input.component";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {InputNumberDirective} from "@app-shared/directives/input-number/input-number.directive";
import {InputAlphanumericDirective} from "@app-shared/directives/input-alphanumeric/input-alphanumeric.directive";
import {InputNoNumberDirective} from "@app-shared/directives/input-no-number/input-no-number.directive";
import {ButtonComponent} from "@app-shared/component/button/button.component";
import {MatButtonModule} from "@angular/material/button";
import {CheckboxComponent} from "@app-shared/component/checkbox/checkbox.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DropdownComponent} from "@app-shared/component/dropdown/dropdown.component";
import {UpdateOutlineGapDirective} from "@app-shared/directives/updateoutlinegap/update-outline-gap.directive";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CircleStatusComponent} from "@app-shared/component/circle-status/circle-status.component";
import {ToggleButtonComponent} from "@app-shared/component/toggle-button/toggle-button.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {StatusBarComponent} from "@app-shared/component/status-bar/status-bar.component";


@NgModule({
  declarations: [
    InputComponent,
    NumericInputComponent,
    AlphanumericInputComponent,
    InputNumberDirective,
    InputNoNumberDirective,
    InputAlphanumericDirective,
    ButtonComponent,
    UpdateOutlineGapDirective,
    DropdownComponent,
    CheckboxComponent,
    CircleStatusComponent,
    ToggleButtonComponent,
    StatusBarComponent
  ],
  exports: [
    InputComponent,
    NumericInputComponent,
    AlphanumericInputComponent,
    InputNumberDirective,
    InputNoNumberDirective,
    InputAlphanumericDirective,
    ButtonComponent,
    DropdownComponent,
    UpdateOutlineGapDirective,
    CheckboxComponent,
    CircleStatusComponent,
    ToggleButtonComponent,
    StatusBarComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({core: fromCore.reducer}),
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
  ],
})
export class SharedModule { }
