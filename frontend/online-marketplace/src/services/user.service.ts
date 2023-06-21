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

  getUserData(username: string | null) {
    return this.http.get<User>(`${this.url}${username}?items=1&transactions=1`)
  }

  transfer(username: string|null, money: number){
    return this.http.patch(this.url + username, {"balance": money})
  }
  
}
