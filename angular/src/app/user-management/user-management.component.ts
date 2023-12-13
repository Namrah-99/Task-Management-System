import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  newUser: User = {} as User; // Empty User object for creating a new user
  editingUser: User = {} as User; // Empty User object for editing a user
  isEdit = false; // Flag to indicate if the user is in edit mode
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('fetchUsers is called next')
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        console.log('Users data : ', data)
        if (data && data.users) {
          this.users = data.users; // Replace 'users' with the actual property name
        } else {
          console.error('Unexpected response structure:', data);
          this.errorMessage = 'Failed to fetch users.';
        }
      },
      (error) => {
        this.errorMessage = 'Failed to fetch users.';
        console.error('Error fetching users:', error);
      }
    );
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(
      (data: User) => {
        this.users.push(data);
        this.newUser = {} as User; // Reset the new user object
      },
      (error) => {
        this.errorMessage = 'Failed to create user.';
        console.error('Error creating user:', error);
      }
    );
  }

  editUser(user: User): void {
    this.isEdit = true;
    this.editingUser = { ...user }; // Make a copy of the user for editing
  }

  updateUser(id: string): void {
    this.userService.updateUser(id, this.editingUser).subscribe(
      () => {
        const index = this.users.findIndex(u => u.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.editingUser }; // Update the user in the local array
          this.isEdit = false;
          this.editingUser = {} as User; // Reset the editing user object
        }
      },
      (error) => {
        this.errorMessage = 'Failed to update user.';
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== id); // Remove the user from the local array
      },
      (error) => {
        this.errorMessage = 'Failed to delete user.';
        console.error('Error deleting user:', error);
      }
    );
  }

  cancelEdit(): void {
    this.isEdit = false;
    this.editingUser = {} as User; // Reset the editing user object
  }

  updateSocialMedia(key: string, value: string): void {
    this.newUser.socialMedia = { ...(this.newUser.socialMedia || {}), [key]: value };
  }
  
}
