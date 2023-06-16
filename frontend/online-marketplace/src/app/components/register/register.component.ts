import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validator';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.passwordsMatching }
  )

  constructor(
    // private router: Router,
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    var user = {
      firstname: this.registerForm.controls["firstname"].value!,
      lastname: this.registerForm.controls["lastname"].value!,
      username: this.registerForm.controls["username"].value!,
      password: this.registerForm.controls["password"].value!,
      email: this.registerForm.controls["email"].value!
    }
    this.authService.register(user).subscribe();
    this.router.navigate(['../login'])
  }
}
