import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'value',
    templateUrl: 'value.component.html',
})
export class ValueComponent {
    @Input('group')
    public valueForm: FormGroup;
	valueMinSize = environment.CONFIG_ADMIN_CREATE_VALUE_MINSIZE;
    valueMaxSize = environment.CONFIG_ADMIN_CREATE_VALUE_MAXSIZE;
	 valueValidationText=environment.CONFIG_ADMIN_VALIDATION_TEXT_VALUE;
}