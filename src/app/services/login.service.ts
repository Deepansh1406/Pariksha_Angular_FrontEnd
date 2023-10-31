import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { retry } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  // Current user: which is login

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);

  }

  // Generate Tokenfor login

  public generateToken(LoginData:any){
    return this.http.post(`${baseUrl}/generate-token`, LoginData);


  }

  // Login userr

  public loginUser(token: any){
    localStorage.setItem('token',token)
    return true;

  }
  
  //user is logged in or not
  public isLogin(){
    let tokenStr= localStorage.getItem("token")
    if(tokenStr== undefined|| tokenStr =='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  // Logout ,remove Token form localstorage
  public logout(){
    localStorage.removeItem("token");
    return true;

  }

  // GetToken
  public getToken(){
    return localStorage.getItem('token');

  }
  //Set user Details
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));

  }
  // Getuser
  public getUser(){
    let  userStr= localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }

  }

  // Role of the User

  public getUserRole(){
    let user  = this.getUser();
    return user.authorities[0].authority;
    
  }
}
