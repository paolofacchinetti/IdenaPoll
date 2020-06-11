import {Directive, OnInit} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";

@Directive({
  selector: '[appUpdateOutlineGap]'
})
export class UpdateOutlineGapDirective implements OnInit {

  constructor(private matFormField: MatFormField) {
  }

  ngOnInit(): void {
    setTimeout(() => this.matFormField.updateOutlineGap(), 800);
  }
}
