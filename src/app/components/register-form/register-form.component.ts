import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { AppUserService } from 'src/app/services/app-user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  username:string = "";
  password:string = "";
  checkPassword:string = "";
  fName:string = "";
  lName:string = "";

  constructor(private appUserService:AppUserService, private router:Router) { }

  ngOnInit(): void {

  }

  registerAccount(){
    console.log("Register this account");
    const appUser:AppUser = new AppUser(0, this.fName, this.lName, this.username, this.password, "");

    this.appUserService.registerAccount(appUser).subscribe(
      (success)=>{
        console.log("Successfully created an account");
        this.router.navigateByUrl("/login");
        alert("Successfully registered an account.");
      },
      (error)=>{
        console.log("There was an error creating your account.");
      }
    );
  }

}
