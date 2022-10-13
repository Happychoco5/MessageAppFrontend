import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  friendInfo:AppUser = new AppUser(0, "",  "", "", "", "");
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  updateMessageInfo(user:AppUser){
    this.friendInfo = user;
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

}
