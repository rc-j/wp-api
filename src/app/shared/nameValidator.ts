import { AbstractControl } from "@angular/forms";
export function nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!(/^[\w]+$/).test(control.value)) {
    return { notAlphabet: true };
  }
  if (control.value == 'hitler') {
    return { forbiddenName: true }
  }
  return null;
}