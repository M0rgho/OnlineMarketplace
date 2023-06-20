import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/interfaces/Item';
import { MarketTransaction } from 'src/interfaces/MarketTransaction';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private marketTransactionSubject = new BehaviorSubject<MarketTransaction[]>([]);


  constructor(private http: HttpClient) {
    const url = 'http://localhost:3000/market_offers';

    this.http.get<MarketTransaction[]>(url).subscribe(
      (data: MarketTransaction[]) => {
        this.marketTransactionSubject.next(data);
      },
      (error: any) => {
        console.log("Failed to get market transactions!");
        this.marketTransactionSubject.next([]);
      });
  }

  getActiveTransactions$() {
    return this.marketTransactionSubject.asObservable();
  }


  sell(item: Item, user: User){
    const url = 'http://localhost:3000/sell';
    const transaction = {    
      postedDate: Date,
      price: item.price,
      status: 'Active',
      seller: user,
      item: item
    }
    console.log(transaction)

    return this.http.post<MarketTransaction[]>(url, transaction);
  }

  buy(transaction: MarketTransaction, username: string){
    const url = 'http://localhost:3000/buy';
    const offer = {
      username: username,
      transaction: transaction
    }
    console.log(offer)
    return this.http.post<MarketTransaction[]>(url, offer);
  }
  cancel(item: MarketTransaction){
    const url = 'http://localhost:3000/cancel';

    return this.http.post<MarketTransaction[]>(url, item);
  }
}
