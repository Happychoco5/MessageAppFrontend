import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppUser } from 'src/app/models/AppUser';
import { Friend } from 'src/app/models/Friend';
import { FriendList } from 'src/app/models/FriendList';
import { AppUserService } from 'src/app/services/app-user.service';
import { FriendService } from 'src/app/services/friend.service';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  //Adding friend information
  friendUsername:string = "";
  friend:AppUser = new AppUser(0, '', '', '', '', '');
  
  //Friend list information
  finishedRequest:boolean = false;
  showList:boolean = false;
  status:string = "";
  friends:Friend[]|undefined = [];
  friendlists:FriendList[] = [];

  //Current user information
  appUser:AppUser = new AppUser(0, "", "", "", "", "")

  @Output() sendFriendMessageEvent = new EventEmitter<AppUser>();

  constructor(private friendService:FriendService, private jwtDecoder:JwtDecoderService, private appUserService:AppUserService) { }

  ngOnInit(): void {
    this.appUserService.getUserWithUsername(this.jwtDecoder.parseJwt().username).subscribe(
      (user)=>{
        this.appUser = user;
      }
    )
  }

  selectFriend(user:AppUser){
    this.friend = user;
    this.sendFriendMessageEvent.emit(this.friend)
  }


  async showFriends(){
    this.finishedRequest = false;
    this.friendlists = [];
    this.showList = true;
    this.status = "Friends";
    this.friends = await this.friendService.findFriends(this.appUser);
    if(this.friends !== undefined)
    {
      for(let f of this.friends){
        let id:number = 0;
        if(f.userid == this.appUser.id){
          id = f.friend_id;
        }
        else{
          id = f.userid;
        }
        let newUser:AppUser|undefined = await this.appUserService.getUserWithId(id);
        if(newUser !== undefined){
          const friendList:FriendList = new FriendList(newUser, f);
          this.friendlists.push(friendList);
        }
      }
    }
    this.finishedRequest = true;
    console.log(this.friendlists);

  }

  async showPending(){
    this.finishedRequest = false;
    this.friendlists = [];
    this.showList = true;
    this.status = "Pending";
    this.friends = await this.friendService.findPendingRequests(this.appUser);
    if(this.friends !== undefined)
    {
      for(let f of this.friends){
        let newUser:AppUser|undefined = await this.appUserService.getUserWithId(f.userid);
        if(newUser !== undefined){
          const friendList:FriendList = new FriendList(newUser, f);
          this.friendlists.push(friendList);
        }
      }
    }
    console.log(this.friendlists);
    this.finishedRequest = true;
  }
  
  addFriend(){
    this.appUserService.getUserWithUsername(this.friendUsername).subscribe(
      (user)=>{
        this.friendService.addFriend(user, this.appUser).subscribe(
          (addfriend)=>{
            console.log("Friend added successfully!");
            alert("Friend added successfully!");
          },
          (error)=>{
            console.log("An error occurred adding friend");
            alert("An error occurred adding friend")
          }
        )
      },
      (error)=>{
        console.log(error.status);
        console.log("An error occurred adding that friend.");
        alert("Could not find user with that username");
      }
    );

  }

  acceptRequest(friend:AppUser){
    this.friendService.acceptFriend(friend, this.appUser).subscribe(
      (success)=>{
        console.log("Successfully accepted request.");
        alert("Successfully accepted friend request");
      },
      (error)=>{
        console.log("Error occurred accepting request.");
        alert("Erro occured, could not accept request.");
      }
    );
    this.showList = false;
  }

  declineRequest(friend:AppUser){
    this.friendService.acceptFriend(friend, this.appUser).subscribe(
      (success)=>{
        console.log("Successfully accepted request.");
        alert("Successfully declined friend request");
      },
      (error)=>{
        console.log("Error occurred accepting request.");
        alert("Erro occured, could not decline request.");
      }
    );
    this.showList = false;
  }

  removeFriend(friend:AppUser){
    this.friendService.declineOrRemoveFriend(friend, this.appUser, "Friends").subscribe(
      (success)=>{
        console.log("Successfully deleted friend");
        alert("Successfully removed friend");
      },
      (error)=>{
        console.log("An error occurred deleting that friend");
        alert("An error occurred removing that friend");
      }
    );
    this.showFriends();
  }

}
