import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../forms/user-form/user-form.component';
import { Subscription } from 'rxjs';
import { UserDataService } from '../services/shared/user-data.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';

  private userDataSubscription: Subscription;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private userDataService: UserDataService
  ) {
    // Subscribe to changes in user data
    this.userDataSubscription = this.userDataService.userData$.subscribe(
      (userData: User | null) => {
        if (userData) {
          // Update local array with the new or updated user
          const index = this.users.findIndex(u => u.id === userData.id);
          if (index !== -1) {
            this.users[index] = { ...userData };
          } else {
            this.users.push(userData);
          }
        }
      }
    );
  }

  ngOnInit(): void {
    console.log('fetchUsers is called next');
    this.fetchUsers();
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.userDataSubscription.unsubscribe();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        console.log('Users data : ', data);
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

  openUserFormDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { user: user || null }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed
    });
  }
}
