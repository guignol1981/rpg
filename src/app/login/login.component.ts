import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public formGroup: FormGroup;
    public tryAgain = false;

    constructor(private userService: UserService, private router: Router) { }

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

        this.userService.login(this.formGroup.value).then((success) => {
            if (!success) {
                this.tryAgain = !success;
            } else {
                this.router.navigateByUrl('/character-creation');
            }
        });
    }
}
