import {StatusEnum} from './status.enum';

export class SessionBean {
  auth: AuthBean;
  status: StatusEnum;
}

export class AuthBean{
  authenticated: boolean;
  address: string;
  constructor(json?: string) {
    if(json){
      this.authenticated = json['authenticated'];
      this.address = json['address'];
    }
  }
}
