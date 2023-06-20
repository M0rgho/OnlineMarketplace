import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router ){

  }
    logout(){
      localStorage.setItem('token','')
      localStorage.setItem('user','none')
      this.router.navigate(['../login'])
    }
}
