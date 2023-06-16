import { Component, Input } from '@angular/core';
import { Item } from 'src/interfaces/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: Item;
  borderColor: string = "black"
  imgSrc: string = "../../../assets/photos/"
  ngOnInit(){
    this.getColor()
    this.imgSrc = this.imgSrc+this.item.imgUrl
  }

  getColor(){
    switch (this.item.rarity){
      case "common":
        this.borderColor = "black";
        break;
      case "uncommon":
        this.borderColor = "blue";
        break;
      case "epic":
        this.borderColor = "violet";
        break;
      case "legendary":
        this.borderColor = "gold";
        break;
    }
  }
}
