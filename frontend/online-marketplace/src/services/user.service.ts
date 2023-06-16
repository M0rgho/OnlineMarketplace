import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(username: String | null) {
    var token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    // console.log("user service token " + token)
    return this.http.get<User>(this.url + username, httpOptions)
  }

  transfer(username: String|null, money: Number){
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