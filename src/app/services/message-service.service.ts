import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(private http:HttpClient) { }

  //Handles sending and recieving requests related to the messages

  public sendMessage(message:Message){
     return this.http.post(`http://localhost:8080/messages`, message);
  }

  public getMessagesBetweenUsers(myId:number, friendId:number): Observable<Message[]>{
    return this.http.get<Message[]>(`http://localhost:8080/messages/${myId}/${friendId}`);
  }
}
