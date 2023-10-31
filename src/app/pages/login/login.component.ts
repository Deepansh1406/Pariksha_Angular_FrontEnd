import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginData={
    username:'',
    password:'',
  };
  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router){
    
  }

  formSubmit(){
    console.log("Login nutton click")
    if(this.LoginData.username.trim()== '' || this.LoginData.username== null){
      this.snack.open("Username is required !!",'',{
        duration:3000,
      });
      return;
    }
    if(this.LoginData.password.trim()== '' || this.LoginData.password== null){
      this.snack.open("Password is required !!",'',{
        duration:3000,
      });
      return;
    }

    // Request to server to generate Token

this.login.generateToken(this.LoginData).subscribe(
  (data:any)=>{
    console.log("Success!!")
    console.log(data);

    // Login...
    this.login.loginUser(data.token);
    this.login.getCurrentUser().subscribe(
      (user:any)=>{
        this.login.setUser(user);
        console.log(user);
        // Redirecting user after successful authentication
        //        window.location.href = "/dashboard";----forn admin
        //        window.location.href = "/normal";----forn normal

        if(this.login.getUserRole() == 'admin'){
          //          alert('Admin');
          // window.location.href='/admin'
          this.router.navigate(['admin'])

        }else if(this.login.getUserRole()=='Normal'){
          //           alert('Normal User')
          // window.location.href='/user'
          this.router.navigate(['user/0'])
        }else{
          //            alert('No role found!')
          this.login.logout();
        }
        
      }
    )


  },
  (error)=>{
    console.log('Error')
    console.log(error);
    this.snack.open("Invalid Details, Please try again!!", '',{
      duration:3000,
    })
  }
)
  }
}
