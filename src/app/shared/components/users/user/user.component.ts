import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iuser } from 'src/app/shared/models/user';
import { usersService } from 'src/app/shared/services/users.service';
import { GetConfirmationComponent } from '../../get-confirmation/get-confirmation.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  userId!: string;
  userObj!: Iuser;
  userSub!: Subscription;
  constructor(
    private _activeRoutes: ActivatedRoute,
    private _usersService: usersService,
    private _matDialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this._activeRoutes.snapshot.params['userId'];
    if(this.userId){
      this.userSub = this._usersService.getUser(this.userId)
        .subscribe(res => {
          this.userObj = res
        })
    };

    // this._activeRoutes.params.subscribe((params: Params) => {
    //   console.log(params);
    //   this.userId = params['userId'];
    //   this.userSub = this._usersService.getUser(this.userId).subscribe((res) => {
    //     this.userObj = res;
    //   });
    // });
    
  }

  removeUserOnClick(){
    // let getConfirm = confirm(`Are you sure, you want to remove the user?`)
    // if(getConfirm){
    //   this._usersService.removeUser(this.userObj)
    // }

    let matDialogConfig = new MatDialogConfig();

    matDialogConfig.disableClose = true
    matDialogConfig.width = '500px';
    matDialogConfig.data = `Do you really want to delete the user ${this.userObj.userName}?  `

    let matDialogRef = this._matDialog.open(GetConfirmationComponent, matDialogConfig)
    matDialogRef.afterClosed()
    .subscribe(res => {
      if(res){
        this._usersService.removeUser(this.userObj)
      }
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  
}

// In Angular, when navigating from one route to another using the same component, such as
// /users/U1001 → /users/U1002

// Angular reuses the same component instance to improve performance. This causes issues if we rely only on ActivatedRoute.snapshot


// ActivatedRoute.snapshot.params =>
// Captures the initial value of the route param when the component is first created.
// Does not update if the param changes while staying in the same component.

// ActivatedRoute.params.subscribe() =>
// Subscribes to changes in route parameters.
// Triggers every time the parameter changes, even if the component is reused.


// Why Angular Reuses Components ==>

// Performance Optimization: Prevents unnecessary destruction and recreation of components.
// Component Lifecycle: Angular avoids triggering ngOnInit() again for the same component.
// Faster Navigation: Improves speed and reduces flicker or UI lag.


// When to Use What

// Use snapshot.params['id'] when:
// You are sure the component will be destroyed and recreated (e.g., navigating between different components).

// Use params.subscribe() when:
// Navigating within the same component type, but with different route parameters.
// You want to reactively fetch new data when the route changes.



// ActivatedRoute.snapshot
// ➕ Advantages:
// Simple and straightforward — great for one-time read (e.g., page load).
// No need to unsubscribe — it's not an observable.
// ➖ Disadvantages:
// Does NOT react to route param changes — if you're already on the component and navigate to another route with a different param, it won’t update.
// Use Case:
// Perfect when route won't change (like going from /users to /users/U1001 only once).

// ActivatedRoute.params.subscribe()
// ➕ Advantages:
// Reacts to param changes — great when the same component is reused with different route parameters.
// Useful for child-to-child navigation or same component reload with new data.
// ➖ Disadvantages:
// Nesting subscriptions (Higher Order Observables) can lead to harder-to-read logic.
// Manual unsubscribe required — to prevent memory leaks.
// Use Case:
// Essential when navigating within the same component but with different route params (e.g., clicking on user links from a user list).