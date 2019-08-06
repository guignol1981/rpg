import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    login(): void {
        if (!this.formGroup.valid) {
            return;
        }

        this.userService.login(this.formGroup.value);
    }

}
