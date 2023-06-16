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
  itemForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    imgUrl: new FormControl(''),
    price: new FormControl(''),
    rarity: new FormControl(''),
    collection: new FormControl(''),
    condition: new FormControl('')
  })
  constructor(private service: ItemsService) {}

  submit(){
    let form = this.itemForm
    let i: Item = {
      name: form.controls["name"].value as String, 
      date:new Date(),
      type: form.controls["type"].value as String, 
      imgUrl: form.controls["imgUrl"].value as String,
      price: parseInt(form.controls["price"].value!) as Number,
      rarity: form.controls["rarity"].value as String,
      fromCollection: form.controls["collection"].value as String,
      condition: form.controls["condition"].value as String
    }
    console.log(i)
    this.service.addData(i).subscribe()
  }
}