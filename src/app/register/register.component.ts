import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData:any = {}
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
      .subscribe({
        next:(res)=>{
          console.log(res);
          alert("User Registered Successfully")
          localStorage.setItem('token',res.token)
        },
        error:()=>{
          alert("Error")
        }
      })
  }

}
