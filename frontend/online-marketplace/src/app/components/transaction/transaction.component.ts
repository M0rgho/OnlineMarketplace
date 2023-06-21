import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/User';
import { MarketTransaction } from '../../../interfaces/MarketTransaction';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  @Input() transaction?: MarketTransaction;

}
