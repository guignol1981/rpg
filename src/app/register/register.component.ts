import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    onRegisterClicked(): void {
        this.userService.register(this.formGroup.value);
    }
}
