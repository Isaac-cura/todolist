import { Component, OnInit } from '@angular/core';
import { UserDatasource } from 'src/app/models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userHeaders: string[] = [];
  userInformation: any[][] = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      if(users && users?.length) {
        this.userHeaders = Object.keys(users[0]);
        this.userInformation = users.map(user => {
          return this.userHeaders.map(key => user[key]);
        })
      }
    });
  }

}
