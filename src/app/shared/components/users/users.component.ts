import { Component, OnDestroy, OnInit } from '@angular/core';
import { Iuser } from '../../models/user';
import { usersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  usersArr: Array<Iuser> = [];

  usersSub!: Subscription;
  constructor(private _usersService: usersService) {}

  ngOnInit(): void {
    this.usersSub = this._usersService
      .fetchAllUsers()
      .subscribe((res) => {
        console.log(res);
        this.usersArr = res;
      });
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}
