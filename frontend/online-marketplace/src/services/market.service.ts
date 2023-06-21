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
  static readonly url = "http://localhost:3000/market"

  constructor(private http: HttpClient) {

    this.http.get<MarketTransaction[]>(`${MarketService.url}/transactions?status=Active`).subscribe(
      (data: MarketTransaction[]) => {
        this.marketTransactionSubject.next(data);
      },
      (error: any) => {
        console.log("Failed to get market transactions!");
        this.marketTransactionSubject.next([]);
      });
  }

  getActiveTransactions$() {
    return this.http.get<MarketTransaction[]>(`${MarketService.url}/transactions?status=Active`);
  }

  getUserTransactions(user_id: string) {
    return this.http.get<MarketTransaction[]>(`${MarketService.url}/transactions?user=user_id`);
  }

  getItemTransactions(item_id: string) {
    return this.http.get<MarketTransaction[]>(`${MarketService.url}/transactions?item=item_id`);
  }


  sell(item: Item){
    const transaction = {    
      seller_name: localStorage.getItem('user'),
      item_id: item._id,
      price: item.price
    }
    console.log(transaction)

    return this.http.post<MarketTransaction[]>(`http://localhost:3000/market/sell`, { 
      transaction: transaction
    });
  }

  buy(transaction: MarketTransaction, username: string){
    const body = {
      buyer_name: username,
      transaction_id: transaction._id,
    }
    console.log(body)
    return this.http.post<MarketTransaction[]>(`${MarketService.url}/buy`, body);
  }

  cancel(transaction: MarketTransaction){

    return this.http.post<MarketTransaction[]>(`${MarketService.url}/cancel`, {
      transaction_id: transaction._id,
      seller: transaction.seller
    });
  }
}
