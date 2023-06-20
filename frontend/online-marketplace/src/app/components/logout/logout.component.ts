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
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('id')
      this.router.navigate(['../login'])
    }
}
