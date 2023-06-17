import { Component } from '@angular/core';
import { Filter } from 'src/app/utils/filter';
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

  filter: Filter = new Filter()
  constructor(private service: ItemsService) {}
  ngOnInit() {
    this.updateData()
  }

  // todo
  check(item: Item){
    return this.filter.check(item)
  }

  //

  updateData(){
    this.service.getData().subscribe(res=>{
      this.items=res
      console.log(this.items)
    })
  }
  buy(itemId: String ){
    this.service.buy("asdf",itemId ).subscribe()
  }
}
