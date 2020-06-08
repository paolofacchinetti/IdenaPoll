import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  btcAddressForm;
  dnaAddressForm;
  dnaAddress = 'placeholder';
  btcAddress = 'placeholder';

  constructor(private fb: FormBuilder) {
    this.dnaAddressForm = this.fb.group({
      dnaAdd: [this.dnaAddress]
    });
    this.btcAddressForm = this.fb.group({
      btcAdd: [this.btcAddress]
    });
  }

  ngOnInit(): void {
  }

  copyToClipboard(address: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (address));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

}
