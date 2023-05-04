import { Component } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Observable } from 'rxjs';
import { Item } from 'src/interfaces/Item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Item[] | null = null;

  constructor(private service: ItemsService) {}
  ngOnInit() {
    this.service.getData().subscribe(res=>{
        this.items=res
        console.log(this.items)
    })
  }
  title = 'online-marketplace';
}
