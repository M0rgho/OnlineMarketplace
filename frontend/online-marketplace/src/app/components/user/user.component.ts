import { Component } from '@angular/core';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user!: User
  username!: string | null
  formGroup: FormGroup = new FormGroup({
    addControl: new FormControl(null, [Validators.required])
  })
  constructor(private route: ActivatedRoute, private service: UserService,private router: Router){
  }
  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username') 
      this.getData()
     })
  }

  addMoney(){
    var money = this.formGroup.get('addControl')?.value
    this.service.transfer(this.username,this.user.balance+money)
    .subscribe( () => this.getData())
  }
  getData(){
    this.service.getUser(this.username).subscribe( user =>{
      this.user = user
      console.log(this.user)
  }, (err) => {
    this.router.navigate(["/login"])
  })
  }
}
