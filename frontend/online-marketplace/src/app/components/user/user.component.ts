import { Component } from '@angular/core';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/interfaces/Item';
import { FilterOption } from 'src/interfaces/FilterOption';
import { Filter } from 'src/app/utils/filter';
import { MarketService } from 'src/services/market.service';
import { AuthService } from 'src/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MarketTransaction } from 'src/interfaces/MarketTransaction';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user!: User
  username!: string 
  option: FilterOption = {name:'', rarity:'none', type:'none',condition:'none',fromCollection:'',price:0}
  filter: Filter = new Filter(this.option)

  formGroup: FormGroup = new FormGroup({
    addControl: new FormControl(null, [Validators.required])
  })
  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private authService: AuthService,
    private router: Router, 
    private marketService: MarketService,
    public dialog: MatDialog
    ){}

  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username')! 
      this.getData()
     })     
  }
  check(item: Item){
    return this.filter.check(item)
  }
  addMoney(){
    var money = this.formGroup.get('addControl')?.value
    this.userService.transfer(this.username,this.user.balance+money)
    .subscribe( () => this.getData())
  }
  getData(){
    this.userService.getUserData(this.username).subscribe( user =>{
      this.user = user
      console.log(this.user)
  }, (err) => {
    this.router.navigate(["/login"])
  })
  }

  getImg(item: Item){
    var imgSrc: string = "../../../assets/photos/"
    imgSrc += item.imgUrl
    return imgSrc
  }

  sell(item: Item): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { text: 'Are you sure you want to sell this item?', loggedIn: this.authService.isUserLoggedIn() }
    });
  
    dialogRef.afterClosed().subscribe((confirm: boolean | number) => {
      if (confirm) {
        this.marketService.sell(item).subscribe((res: any) => {
          this.dialog.open(ErrorDialogComponent,  {
            data: {
              message: res?.body?.meessage || "Successfully put item up for sale"
            },
          },);              
        }, (error: any) => {
          console.log(error);
          this.dialog.open(ErrorDialogComponent,  {
            data: {
              message: error.error.message
            },
          },);
        })
      }
    });
  }
}
