import { Component, OnInit } from '@angular/core';
import { AppUserDataService } from '../service/data/app-user-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export class AppUser {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public name: string,
    public email: string,
    public enabled?: boolean
  ) { }
}

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  users: AppUser[];
  message: string;

  constructor(
    private service: AppUserDataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.retrieveAllUsers();
  }

  retrieveAllUsers() {
    this.service.retrieveAllUsers('houarizegai').subscribe(
      response => {
        this.users = response;
      }
    );
  }

  addUser() {
    this.router.navigate(['app-users', -1]);
  }

  updateUser(id) {
    this.router.navigate(['app-users', id]);
  }

  deleteUser(id) {
    this.service.deleteUser('houarizegai', id).subscribe(
      response => {
        this.toastr.success('Success', 'The user has been deleted!', {
          timeOut: 3000
        });
        this.retrieveAllUsers();
      }
    );
  }

  getStatusClass(enabled: boolean): string {
    return enabled ? 'badge badge-success' : 'badge badge-secondary';
  }

  getStatusText(enabled: boolean): string {
    return enabled ? 'Active' : 'Inactive';
  }
}
