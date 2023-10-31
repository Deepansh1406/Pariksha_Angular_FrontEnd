import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public login: LoginService) {}

  public logout() {
    this.login.logout();
    window.location.reload();
  }

  // Implement the isAdmin function based on the user's role
  isAdmin(): boolean {
    const userRole = this.login.getUserRole(); // Get the user's role from the service
    return userRole === 'admin'; // Assuming 'admin' is the role for administrators
  }
}
