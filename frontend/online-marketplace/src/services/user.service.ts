import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/User';
import { AuthService } from './auth.service';
import { Item } from 'src/interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(username: string | null) {
    var token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    // console.log("user service token " + token)
    return this.http.get<User>(this.url + username, httpOptions)
  }

  transfer(username: string|null, money: number){
    var token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    console.log(money)
    return this.http.patch(this.url + username, {"balance": money}, httpOptions)
  }
  
}
