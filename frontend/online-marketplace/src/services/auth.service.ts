import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/interfaces/User';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/auth';

  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('token') || '');

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.subscribe(token => console.log("TOKEN", token))
    this.tokenSubject.next(token);
  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  public getTokenObeservable(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  constructor(private http: HttpClient) { }

  register(user: User) {
    // console.log(user)
    return this.http.post(this.url + "/signup", user);
  }

  async login(loginData: any) {
    const res: any = await lastValueFrom(this.http.post(this.url + "/signin", loginData));
    console.log(res);
    this.setToken(res.token);
    localStorage.setItem('user', loginData.username)
    localStorage.setItem('id', res.id)
  }

  logout() {
    this.setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
  }
  
}
