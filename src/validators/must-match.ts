import { FormGroup, ValidatorFn } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): any => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value === matchingControl.value) {
            return null;
        } else {
            matchingControl.setErrors(Object.assign(matchingControl.errors || {}, { mustmatch: true }));
        }
    };
}
