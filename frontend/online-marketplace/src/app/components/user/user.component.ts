import { Component } from '@angular/core';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user!: User
  username!: String | null
  constructor(private route: ActivatedRoute, private service: UserService){

  }
  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username') 
      this.service.getUser(this.username).subscribe( res =>{
        this.user = res
        console.log(this.user)
      })
     })
  }

}
