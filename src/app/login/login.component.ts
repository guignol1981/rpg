import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RpgHttpResponse } from 'server/models/rpg-http-response';
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

    public get emailControl(): FormControl {
        return this.formGroup.get('email') as FormControl;
    }

    public get passwordControl(): FormControl {
        return this.formGroup.get('password') as FormControl;
    }

    public login(): void {
        if (!this.formGroup.valid) {
            return;
        }

        this.userService.login(this.formGroup.value).then((response: RpgHttpResponse) => {
            if (response.data) {
                console.log('success');
            } else {
                alert(response.msg);
            }
        });
    }
}
