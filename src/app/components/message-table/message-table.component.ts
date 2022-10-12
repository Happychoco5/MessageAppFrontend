import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { AppUser } from 'src/app/models/Appuser';
import { Message } from 'src/app/models/message';
import { AppUserService } from 'src/app/services/app-user.service';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { MessageServiceService } from 'src/app/services/message-service.service';

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})
export class MessageTableComponent implements OnInit {

  timerSub: Subscription = new Subscription;

  user:AppUser = new AppUser(0, '', '', '', '', '');
  @Input() friend:AppUser = new AppUser(0, '', '', '', '', '');
  messageToSend:Message = new Message(0, 0, 0, 0, "");
  messages:Message[] = [];
  message:string = "";
  
  constructor(private messageService:MessageServiceService, private jwtDecoder:JwtDecoderService, private appUserService:AppUserService) {}

  ngOnInit(): void {
    console.log(this.jwtDecoder.parseJwt().username);
    this.appUserService.getUserWithUsername(this.jwtDecoder.parseJwt().username).subscribe(
      (user) =>{
        this.user = user;
      }
    )
    this.getMessages();
  }

  sendMessage(){
    let sentMessage:Message = new Message(0, 0, 0, 0, "");
    this.messageToSend = new Message(0, this.user.id, this.friend.id, (Date.now() * 60), this.message);
    console.log(this.messageToSend);
    this.messageService.sendMessage(this.messageToSend).subscribe(
      (message)=>{
        console.log("Sent successfully.");
        this.messageToSend = new Message(0, 0, 0, 0, "");
        message = "";
      },
    (error) => {
      console.log("error sending message");
    }
    );
    this.message="";
  }

  getMessages(){
      setInterval(() => {         //replaced function() by ()=>
        console.log(this.friend.username + " " + this.user.username);
        if(this.friend.username !== undefined && this.user.username !== ""){
          this.messageService.getMessagesBetweenUsers(this.user.id, this.friend.id).subscribe(
            (messages:Message[])=>{
              this.messages = messages;
              // console.log(this.messages);
            }
          );
        }
        // console.log("Test");
      }, 500);
  }

}
