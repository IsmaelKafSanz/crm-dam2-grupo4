import { Component, OnInit } from '@angular/core';
import { AppUser } from '../app-users/app-users.component';
import { AppUserDataService } from '../service/data/app-user-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-user-form',
  templateUrl: './app-user-form.component.html',
  styleUrls: ['./app-user-form.component.css']
})
export class AppUserFormComponent implements OnInit {

  user: AppUser;
  id: number;
  isNewUser: boolean = false;

  constructor(
    private service: AppUserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params.id);
    this.isNewUser = this.id === -1;

    const userId = this.isNewUser ? null : this.id;
    this.user = new AppUser(userId, '', '', '', '', true);

    if (!this.isNewUser) {
      this.service.retrieveUser('houarizegai', this.id).subscribe(
        response => {
          this.user = response;
          // No mostrar la contraseña existente por seguridad
          this.user.password = '';
        }
      );
    }
  }

  onSave() {
    console.log('=== SAVING USER ===');
    console.log('Route ID:', this.id);
    console.log('User before save:', this.user);

    if (this.isNewUser) {
      console.log('>>> Creating NEW user (POST)');

      const newUser = {
        username: this.user.username,
        password: this.user.password,
        name: this.user.name,
        email: this.user.email,
        enabled: this.user.enabled
      };

      console.log('New user object to send:', newUser);

      this.service.addUser('houarizegai', newUser as AppUser).subscribe(
        response => {
          console.log('✅ User created successfully:', response);
          this.router.navigate(['app-users']);
        },
        error => {
          console.error('❌ Error creating user:', error);
          console.error('Error details:', error.error);
          console.error('Status:', error.status);
        }
      );
    } else {
      console.log('>>> Updating EXISTING user (PUT)');

      // Si no se proporciona contraseña, enviar un objeto sin el campo password
      const updateUser = {
        ...this.user
      };

      // Si la contraseña está vacía, no la enviamos (se mantiene la anterior en el backend)
      if (!this.user.password || this.user.password.trim() === '') {
        delete updateUser.password;
      }

      this.service.updateUser('houarizegai', updateUser as AppUser).subscribe(
        response => {
          console.log('✅ User updated successfully:', response);
          this.router.navigate(['app-users']);
        },
        error => {
          console.error('❌ Error updating user:', error);
        }
      );
    }
  }
}
