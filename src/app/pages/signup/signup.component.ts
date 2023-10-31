import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private renderer: Renderer2
  ) {}

  @ViewChild('passwordInput') passwordInput!: ElementRef; // Add ! to indicate it will be initialized later

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  hidePassword = true; // Initially, password is hidden

  ngOnInit() {
    // You can initialize the passwordInput property here if needed
    // Example: this.passwordInput = ...;
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open("Username is required", '', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    // Add user from userService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success done', 'User id is !!' + data.id, 'success');

        // Reset the input fields to their initial state
        this.user = {
          username: '',
          password: '',
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
        };
        this.hidePassword = true;
        this.renderer.setProperty(this.passwordInput.nativeElement, 'type', 'password');
      },
      (error) => {
        console.log(error);
        this.snack.open("Something went wrong!!", '', {
          duration: 2000
        });
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    const inputType = this.hidePassword ? 'password' : 'text';
    this.renderer.setProperty(this.passwordInput.nativeElement, 'type', inputType);
  }
}
