import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/Appuser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  friendInfo:AppUser = new AppUser(0, "",  "", "", "", "");
  
  constructor() { }

  ngOnInit(): void {
  }

  updateMessageInfo(user:AppUser){
    this.friendInfo = user;
  }

}
