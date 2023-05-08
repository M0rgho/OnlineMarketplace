import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) { }
  
  getUser(username: String | null){
    // console.log(this.url+username)
    return this.http.get<User>(this.url+username)
  }
}
