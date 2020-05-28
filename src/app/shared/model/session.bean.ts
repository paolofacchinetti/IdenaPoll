import {StatusEnum} from './status.enum';

export class SessionBean {
  constructor(age: number, address: string, status: StatusEnum) {
    this._age = age;
    this._address = address;
    this._status = status;
  }

  private _age: number;

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  private _address: string;

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    console.log(this)
    this._address = value;
  }

  private _status: StatusEnum;

  get status(): StatusEnum {
    return this._status;
  }

  set status(value: StatusEnum) {
    this._status = value;
  }
}




