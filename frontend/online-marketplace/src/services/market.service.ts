import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/interfaces/Item';
import { MarketTransaction } from 'src/interfaces/MarketTransaction';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  constructor(private http: HttpClient) { }

  getData() {
    const url = 'http://localhost:3000/market_offers';

    return this.http.get<MarketTransaction[]>(url);
  }

  sell(item: Item, user: User){
    const url = 'http://localhost:3000/sell';
    const transaction = {    postedDate: Date,
      price: item.price,
      status: 'Active',
      seller: user,
      item: item
    }
    console.log(transaction)

    return this.http.post<MarketTransaction[]>(url, transaction);
  }

}
