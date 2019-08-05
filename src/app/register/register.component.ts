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
            email: new FormControl('', [Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(5)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
        }, [MustMatch('password', 'confirmPassword')]);
    }

    onRegisterClicked(): void {
        if (!this.formGroup.valid) {
            return;
        }

        this.userService.register(this.formGroup.value);
    }
}
