import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[mustMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MustMatchDirective,
      multi: true
    }
  ]
})
export class MustMatchDirective implements Validator {
  @Input('mustMatch') matchingControlName!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const controlToCompare = control.root.get(this.matchingControlName);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { mustMatch: true };
    }
    return null;
  }
}
