import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  username:string = '';
  password:string = '';

  async validateLogin(){
    // const credentials:Credentials = {guardianUsername:this.guardianUsername,guardianPassword:this.guardianPassword}
    // const userToken:Token = await this.loginService.validateLogin(credentials)
    // if(userToken == null or if the status code is 404){tell them the login was invalid}
    // if(userToken.isTeacher){this.router.navigateByUrl("gradepage")}
    // if(userToken.isGuardian){this.router.navigateByUrl("studentpage")}
    // just for now, for testing
    const loginCreds = {username:this.username, password:this.password}
    const response = await this.loginService.login(JSON.stringify(loginCreds));
    if(response != null){
      localStorage.setItem("userInfo", JSON.stringify(response));
      this.router.navigateByUrl("/main");
      alert("Successfully logged in.");
    }
  }

}

