import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/interfaces/Item';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {
  item_id!: string;
  item$!: Observable<Item>;
  transactions: string[] = ['Transaction 1', 'Transaction 2', 'Transaction 3'];

  constructor (
    private route: ActivatedRoute,
    private itemsService: ItemsService
    ){}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.item_id = params.get('_id')!;
      this.item$ = this.itemsService.getItem(this.item_id)
      this.item$.subscribe(item => console.log(item));
     }) 
  }
}
