import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/auth/signup';

  constructor(private http: HttpClient) { }

  register(user: User) {
    console.log(user)
    return this.http.post(this.url, user);
  }
}
