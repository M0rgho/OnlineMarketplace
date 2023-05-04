import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get<any[]>(this.url);
  }

  addData(data: any) {
    return this.http.post(this.url, data);
  }
}
