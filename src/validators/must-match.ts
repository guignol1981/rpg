import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value === matchingControl.value) {
            return null;
        } else {
            return { mustMatch: true };
        }
    };
}
