import { Component } from '@angular/core';
import { Filter } from 'src/app/utils/filter';
import { FilterOption } from 'src/interfaces/FilterOption';
import { Item } from 'src/interfaces/Item';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent {
  items: Item[] | null = null;
  selected = 'none'
  option: FilterOption = {name:'', rarity:'none', type:'none',condition:'none',fromCollection:'',price:0}

  filter: Filter = new Filter(this.option)
  constructor(private service: ItemsService) {}
  ngOnInit() {
    this.updateData()
  }

  check(item: Item){
    return this.filter.check(item)
  }

  updateData(){
    this.service.getData().subscribe(res=>{
      this.items=res
      console.log(this.items)
    })
  }
  buy(itemId: string ){
    this.service.buy("asdf",itemId ).subscribe()
  }
}
