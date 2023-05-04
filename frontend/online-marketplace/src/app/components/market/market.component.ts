import { Component } from '@angular/core';
import { Item } from 'src/interfaces/Item';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent {
  items: Item[] | null = null;

  constructor(private service: ItemsService) {}
  ngOnInit() {
    this.service.getData().subscribe(res=>{
        this.items=res
    })
  }
}
