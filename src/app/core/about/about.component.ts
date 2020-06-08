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
  dnaAddress = '0x2ec35e9b586acbccaba7feba0dfca9e476fda163';
  btcAddress = '1Hw5ijigoX7ozn7G5hb2ughK8VHDj7NAng';

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
