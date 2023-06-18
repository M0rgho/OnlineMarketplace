import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from 'src/interfaces/Item';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent {
  item: Item = {name:'', rarity:'none', type:'none',condition:'none',fromCollection:'',date: new Date(),price:0, imgUrl:'',}


  constructor(private service: ItemsService) {}

  submit(){

    console.log(this.item)
    this.service.addData(this.item).subscribe()
  }
}
