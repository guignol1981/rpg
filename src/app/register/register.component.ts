import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/validators/must-match';
import { UserService } from '../user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    private formGroup: FormGroup;
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(5)]),
            confirmPassword: new FormControl('', [Validators.required])
        }, [MustMatch('password', 'confirmPassword')]);
    }

    public get usernameControl(): FormControl {
        return this.formGroup.get('username') as FormControl;
    }

    public get emailControl(): FormControl {
        return this.formGroup.get('email') as FormControl;
    }

    public get passwordControl(): FormControl {
        return this.formGroup.get('password') as FormControl;
    }

    public get confirmPasswordControl(): FormControl {
        return this.formGroup.get('confirmPassword') as FormControl;
    }

    public register(): void {
        if (!this.formGroup.valid) {
            return;
        }

        this.userService.register(this.formGroup.value);
    }
}
