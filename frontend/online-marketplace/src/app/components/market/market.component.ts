import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/utils/filter';
import { FilterOption } from 'src/interfaces/FilterOption';
import { Item } from 'src/interfaces/Item';
import { MarketTransaction } from 'src/interfaces/MarketTransaction';
import { MarketService } from 'src/services/market.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent {
  transactions$: Observable<MarketTransaction[]> = new Observable<MarketTransaction[]>();
  selected = 'none'
  option: FilterOption = {name:'', rarity:'none', type:'none',condition:'none',fromCollection:'',price:0}

  filter: Filter = new Filter(this.option)
  constructor(
    private marketService: MarketService,
    private authService: AuthService,
    public dialog: MatDialog) {}
    
  ngOnInit() {
    this.transactions$ = this.marketService.getActiveTransactions$();
    this.transactions$.subscribe(transitions => console.log(transitions));
  }

  check(item: Item){
    return this.filter.check(item)
  }
  checkToken(transaction: MarketTransaction){
    return localStorage.getItem('id') !== transaction.seller
  }

  cancel(item: MarketTransaction){
    this.marketService.cancel(item).subscribe((res: any) => {
      window.alert(res.body.meessage ?? "Successfully cancelled item sell offer");
        
    }, (error: any) => {
      console.log(error);
      this.openErrorDialog(error.error.message);
    });
  }

  openSellItemDialog(sellOffer: MarketTransaction): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { text: 'Are you sure you want to buy this item?', loggedIn: this.authService.isUserLoggedIn() }
    });
  
    dialogRef.afterClosed().subscribe((confirm: boolean | number) => {
      if (confirm) {
        console.log('User ' + localStorage.getItem("user")! + 'bought form price: ' + sellOffer.price);
        this.marketService.buy(sellOffer, localStorage.getItem("user")!).subscribe((res: any) => {
          this.dialog.open(ErrorDialogComponent,  {
            data: {
              message: "Successfully bought the item"
            },
          },);      
        }, (error: any) => {
          console.log(error);
          this.openErrorDialog(error.error.message);
        })
      }
    });
  }
  
  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent,  {
      data: {
        message: errorMessage
      },
    },);
  }

}

