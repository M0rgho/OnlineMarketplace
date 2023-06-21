import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from 'src/interfaces/Item';
import { ItemsService } from 'src/services/items.service';
import { UserService } from 'src/services/user.service';

type UserPreview = {_id: string, role: string, username: string};

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent {
  item: Item = {name:'', rarity:'none', type:'none',condition:'none',fromCollection:'',date: new Date(),price:0, imgUrl:'',}
  users: UserPreview[] = []

  constructor(private itemsService: ItemsService, private userService: UserService ) {}

  ngOnInit(){
    this.userService.getAllUsers().subscribe((users: UserPreview[]) => {
      this.users = users;
    })
  }

  submit(){

    console.log(this.item)
    this.itemsService.addData(this.item).subscribe()
  }
}
