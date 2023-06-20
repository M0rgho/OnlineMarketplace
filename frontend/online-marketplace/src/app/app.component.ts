import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token$: Observable<string> = of('');

  constructor(private router: Router, private authService: AuthService) {
    this.token$ = this.authService.getTokenObeservable();
  }
  title = 'online-marketplace';

  navUser(){
    this.router.navigate(['../user/'+localStorage.getItem("user")])
  }

  logout(){
    console.log("logout!!");
    this.authService.logout();
  }
}
