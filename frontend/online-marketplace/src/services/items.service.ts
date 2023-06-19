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

  getItem(item_id: string) {
    return this.http.get<Item>('http://localhost:3000/items?id=' + item_id);
  }

  addData(data: Item) {
    console.log(data)
    return this.http.post(this.url, data) ;
  }

  getItemTransactions(item_id: string) {
    return this.http.get<Item>('http://localhost:3000/transactions?item_id=' + item_id);
  }
  
  buy( userId: string, itemId:string){
    // console.log("del"+ this.url+"/"+itemId)
    // return this.http.delete(this.url+"/"+itemId);
  }


}
