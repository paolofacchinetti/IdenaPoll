export function getAllExceptNumberPatternValidator() {
  return /[^0-9]+/;
}

export function getAlphaNumericPatternValidator() {
  return /[^a-zA-Z0-9]+/;
}

export function getNoNumberPatternValidator() {
  return /[^a-zA-Z\-\s]+/;
}
