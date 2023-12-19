// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { User } from 'src/app/models/user.model';
// import { UserDataService } from 'src/app/services/shared/user-data.service';
// import { UserService } from 'src/app/services/user.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-user-form',
//   templateUrl: './user-form.component.html',
//   styleUrls: ['./user-form.component.css']
// })
// export class UserFormComponent {

//   // user: User = {
//   //   email: '',
//   //   password: '',
//   //   role: '',
//   //   subscribed: false,
//   //   socialMedia: {
//   //     twitterUri: '',
//   //     fbUri: ''
//   //   }
//   // };

//   // constructor(
//   //   private dialogRef: MatDialogRef<UserFormComponent>,
//   //   @Inject(MAT_DIALOG_DATA) public data: { user: User },
//   //   private userService: UserService,
//   //   private userDataService: UserDataService
//   // ) {
//   //   // If user data is provided, initialize the form with it
//   //   if (data && data.user) {
//   //     this.user = { ...data.user };
//   //   }
//   // }

//   // userForm: FormGroup;

//   // constructor(
//   //   private fb: FormBuilder,
//   //   public dialogRef: MatDialogRef<UserFormComponent>,
//   //   @Inject(MAT_DIALOG_DATA) public data: any
//   // ) {
//   //   this.initForm();
//   // }
//   user: User = {
//     email: '',
//     password: '',
//     role: '',
//     subscribed: false,
//     socialMedia: {
//       twitterUri: '',
//       fbUri: ''
//     }
//   };

//   userForm: FormGroup; // Remove "!" as it will be initialized in the constructor

//   constructor(
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<UserFormComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private userService: UserService,
//     private userDataService: UserDataService
//   ) {
//     this.initForm();
//   }

//   initForm(): void {
//     this.userForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       username: [''],
//       age: [null, [Validators.min(1)]],
//       phoneNumber: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
//       role: ['', [Validators.required]],
//       subscribed: [false],
//       twitterUri: ['', [Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
//       fbUri: ['', [Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
//     });
  
//     if (this.data.user) {
//       // If editing an existing user, patch the form with user data
//       this.userForm.patchValue(this.data.user);
//     }
//   }
  

//   onSaveClick() {
//     if (this.data.user) {
//       this.updateUser(); // Update existing user
//     } else {
//       this.createUser(); // Create new user
//     }
//   }

//   updateSocialMedia(key: string, value: any) {
//     // Ensure user and socialMedia are initialized before updating properties
//     if (!this.user.socialMedia) {
//       this.user.socialMedia = {
//         twitterUri: '',
//         fbUri: ''
//       };
//     }

//     // Use type assertion to tell TypeScript that key is a valid property
//     (this.user.socialMedia as { [key: string]: string })[key] = value;
//   }

//   updateUser() {
//     this.userService.updateUser(this.user.id || '', this.user).subscribe(
//       (updatedUser: User) => {
//         console.log('User data updated:', updatedUser);
//         // Notify UserManagementComponent about the update
//         this.userDataService.setUserData(updatedUser);
//         this.dialogRef.close();
//       },
//       (error) => {
//         console.error('Error updating user:', error);
//         // Handle error if needed
//       }
//     );
//   }

//   createUser() {
//     this.userService.createUser(this.user).subscribe(
//       (createdUser: User) => {
//         console.log('User created:', createdUser);
//         // Notify UserManagementComponent about the creation
//         this.userDataService.setUserData(createdUser);
//         this.dialogRef.close();
//       },
//       (error) => {
//         console.error('Error creating user:', error);
//         // Handle error if needed
//       }
//     );
//   }

//   onNoClick() {
//     // Close the dialog without saving
//     this.dialogRef.close();
//   }
// }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/shared/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user: User = {
    email: '',
    password: '',
    role: '',
    subscribed: false,
    socialMedia: {
      twitterUri: '',
      fbUri: ''
    }
  };

  userForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private userDataService: UserDataService
  ) {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      username: [''],
      age: [null, [Validators.min(1)]],
      phoneNumber: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      role: ['', [Validators.required]],
      subscribed: [false],
      twitterUri: ['', [Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      fbUri: ['', [Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
    });

    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  onSaveClick() {
    if (this.data.user) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  updateSocialMedia(key: string, value: any) {
    if (!this.user.socialMedia) {
      this.user.socialMedia = {
        twitterUri: '',
        fbUri: ''
      };
    }

    (this.user.socialMedia as { [key: string]: string })[key] = value;
  }

  updateUser() {
    this.userService.updateUser(this.user.id || '', this.user).subscribe(
      (updatedUser: User) => {
        console.log('User data updated:', updatedUser);
        this.userDataService.setUserData(updatedUser);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  createUser() {
    this.userService.createUser(this.user).subscribe(
      (createdUser: User) => {
        console.log('User created:', createdUser);
        this.userDataService.setUserData(createdUser);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

