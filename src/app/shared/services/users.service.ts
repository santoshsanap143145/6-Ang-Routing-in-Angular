import { Injectable } from '@angular/core';
import { Iuser } from '../models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class usersService {
  userArr: Array<Iuser> = [
    {
      userName: 'Jane Doe',
      userId: 'U1001',
      userRole: 'Candidate',
    },
    {
      userName: 'Sara Lee',
      userId: 'U1003',
      userRole: 'Super-Admin',
    },
    {
      userName: 'Emily Jones',
      userId: 'U1005',
      userRole: 'Admin',
    },
    {
      userName: 'David Wilson',
      userId: 'U1006',
      userRole: 'Super-Admin',
    },
    {
      userName: 'Lisa Kim',
      userId: 'U1007',
      userRole: 'Candidate',
    },
    {
      userName: 'Daniel Garcia',
      userId: 'U1008',
      userRole: 'Admin',
    },
    {
      userName: 'Chris Evans',
      userId: 'U1010',
      userRole: 'Candidate',
    },
  ];

  constructor(private _router: Router, private _snackbar: SnackbarService) {}

  fetchAllUsers(): Observable<Array<Iuser>> {
    // API call to fetch all users data
    return of(this.userArr);
  }

  addUser(userObj: Iuser): void {
    // API call to add new user in DB
    this.userArr.push(userObj);

    // when we send obj to DB then it returns our obj with Id added as property in obj

    // return of(userObj)
    this._router.navigate(['users']);

    this._snackbar.openSnackBar(
      `The New User ${userObj.userName} is added successfully!!!`
    );
  }

  getUser(id: string): Observable<Iuser> {
    // API call to get User Details
    let user = this.userArr.find((user) => user.userId === id)!;
    return of(user);
  }

  updateUser(updatedUser: Iuser) {
    let getIndex = this.userArr.findIndex(
      (user) => user.userId === updatedUser.userId
    );
    this.userArr[getIndex] = updatedUser;
    this._router.navigate(['users']);
    this._snackbar.openSnackBar(
      `The User ${updatedUser.userName} is updated successfully!!!`
    );
  }

  removeUser(userTobeRemoved: Iuser) {
    let getIndex = this.userArr.findIndex(
      (user) => user.userId === userTobeRemoved.userId
    );
    this.userArr.splice(getIndex, 1);
    this._router.navigate(['users']);
    this._snackbar.openSnackBar(
      `The User ${userTobeRemoved.userName} is removed successfully!!!`
    );
  }
}
