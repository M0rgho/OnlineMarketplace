import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,private router: Router ) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    var loginData = {
      username: this.loginForm.controls["username"].value!,
      password: this.loginForm.controls["password"].value!,
    }
    this.authService.login(loginData).then(() => this.router.navigate(['/user', loginData.username]))

  }

}
