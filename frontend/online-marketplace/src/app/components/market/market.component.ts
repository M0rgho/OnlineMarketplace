import { Component } from '@angular/core';
import { Item } from 'src/interfaces/Item';
import { ItemsService } from 'src/services/items.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent {
  items: Item[] | null = null;
  itemForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    imgUrl: new FormControl(''),

  })
  constructor(private service: ItemsService) {}
  ngOnInit() {
    this.updateData()
  }

  submit(){
    let i: Item = {name: this.getName(), date:new Date("2022") ,type: this.getType(), imgUrl:this.getImg()}
    console.log(i)
    this.service.addData(i).subscribe()
    this.updateData()
  }
  getName(){
    return this.itemForm.controls["name"].value as String
  }
  getType(){
    return this.itemForm.controls["type"].value as String
  }
  getImg(){
    return this.itemForm.controls["imgUrl"].value as String
  }
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
