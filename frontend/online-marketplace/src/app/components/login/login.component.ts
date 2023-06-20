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
    this.authService.login(loginData).subscribe((res:any) => {
      
      localStorage.setItem('token',res.token)
      localStorage.setItem('user',loginData.username)
      
      localStorage.setItem('id',res.id)
       
      this.router.navigate(['../user/'+loginData.username])
    }, (err) => {
      console.log(err.message);
    }
    );
  }

}
