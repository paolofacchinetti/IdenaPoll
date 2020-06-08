import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-twitter-loader',
  templateUrl: './twitter-loader.component.html',
  styleUrls: ['./twitter-loader.component.scss']
})
export class TwitterLoaderComponent implements AfterViewInit {
  constructor() {
  }

  ngAfterViewInit() {
    let ngJs: any;
    const ngFjs = document.getElementsByTagName('script')[0];
    const ngP = 'https';

    if (!document.getElementById('twitter-wjs')) {
      ngJs = document.createElement('script');
      ngJs.id = 'twitter-wjs';
      ngJs.src = ngP + '://platform.twitter.com/widgets.js';
      ngFjs.parentNode.insertBefore(ngJs, ngFjs);
    }
  }
}
