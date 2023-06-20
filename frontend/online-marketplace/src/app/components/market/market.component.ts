import { Component } from '@angular/core';
import { Filter } from 'src/app/utils/filter';
import { FilterOption } from 'src/interfaces/FilterOption';
import { Item } from 'src/interfaces/Item';
import { MarketTransaction } from 'src/interfaces/MarketTransaction';
import { MarketService } from 'src/services/market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent {
  transactions: MarketTransaction[] | null = null;
  selected = 'none'
  option: FilterOption = {name:'', rarity:'none', type:'none',condition:'none',fromCollection:'',price:0}

  filter: Filter = new Filter(this.option)
  constructor(private service: MarketService) {}
  ngOnInit() {
    this.updateData()
  }

  check(item: Item){
    return this.filter.check(item)
  }
  checkToken(){
    return localStorage.getItem("user") != "none"
  }

  updateData(){
    this.service.getData().subscribe(res=>{
      this.transactions=res
      console.log(this.transactions)
    })
  }
  buy(item: MarketTransaction){
    this.service.buy(item, localStorage.getItem("user")!).subscribe()
  }
}
