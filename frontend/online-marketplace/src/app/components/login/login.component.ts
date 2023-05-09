import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    // private authService: AuthService,
    // private router: Router
  ) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    // this.authService.login(this.loginForm.value).pipe(
    //   // route to protected/dashboard, if login was successfull
    //   tap(() => this.router.navigate(['../../protected/dashboard']))
    // ).subscribe();
  }
}
