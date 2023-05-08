import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/Item'

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private url = 'http://localhost:3000/items';

  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get<Item[]>(this.url);
  }

  addData(data: Item) {
    return this.http.post(this.url, data) ;
  }
}
