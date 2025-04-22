import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user';
import { usersService } from 'src/app/shared/services/users.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  isEditMode: boolean = false;
  userId!: string; // bydefault val is undefined
  userForm!: FormGroup; // bydefault undefined
  constructor(
    private _activeRoutes: ActivatedRoute,
    private _uuidService: UuidService,
    private _userService: usersService
  ) {}

  ngOnInit(): void {
    // for reactive form we first create form in ts then we sink this form with the form in html (sink = bind or attach but here word sink is used generally)
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required),
    });

    this.userId = this._activeRoutes.snapshot.params['userId'];
    if (this.userId) {
      this.isEditMode = true;
      // API call to get userObj using userId above
      this._userService.getUser(this.userId).subscribe((user) => {
        this.userForm.patchValue(user);
      });
    }
  }

  onUserSubmit() {
    if (this.userForm.valid) {
      if (!this.isEditMode) {
        let newUser: Iuser = this.userForm.value;
        newUser.userId = this._uuidService.uuid();
        this.userForm.reset();
        this._userService.addUser(newUser);
      } else {
        let updatedUser: Iuser = {
          ...this.userForm.value,
          userId: this.userId,
        };
        this._userService.updateUser(updatedUser)
        
      }
    }
  }
}
