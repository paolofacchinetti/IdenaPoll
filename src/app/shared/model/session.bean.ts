import {StatusEnum} from "./year-type.enum";

export class SessionBean {
  auth: AuthBean;
  status: StatusEnum;
}

export class AuthBean{
  authentificated:boolean;
  address:string;
  constructor(json?:string) {
    if(json){
      this.authentificated = json['authentificated'];
      this.address = json['address'];
    }
  }
}
