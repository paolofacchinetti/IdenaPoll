import {isString} from 'util';

export function getAllExceptNumberPatternValidator() {
  return /[^0-9]+/;
}

export function getAlphaNumericPatternValidator() {
  return /[^a-zA-Z0-9]+/;
}

export function getNoNumberPatternValidator() {
  return /[^a-zA-Z\-\s]+/;
}

export function isNullOrEmpty(value: any): boolean {
  if (value == null || (isString(value) && value === '')) {
    return true;
  }
  return false;
}
