import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormGroup, ValidationErrors, FormControl } from '@angular/forms';


@Directive({
  selector: '[atleastOneValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: AtleastOneValidatorDirective, multi: true}]
})
export class AtleastOneValidatorDirective implements Validator {

  validate(form: FormGroup): ValidationErrors {

    const message = {
      'atleastOneValue': {
        'message': 'At least one telephone number must be entered'
      }
    };

    const values = <FormGroup> form.get('values');
    const hasValues = values && Object.keys(values.controls).length > 0;

    return hasValues ? null : message;
  }
}