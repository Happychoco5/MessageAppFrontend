import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from '../models/Appuser';
import { Friend } from '../models/Friend';
import { AppUserService } from './app-user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http:HttpClient, private appUserService:AppUserService) { }

  addFriend(friend:AppUser, user:AppUser){
    const payload:Friend = new Friend(0, user.id, friend.id, "Pending");
    return this.http.post(`http://localhost:8080/friends`, payload);
  }

  async findPendingRequests(user:AppUser):Promise<Friend[]|undefined>
  {
    return await this.http.get<Friend[]>(`http://localhost:8080/friends/pending/${user.id}`).toPromise();
  }

  async findFriends(user:AppUser):Promise<Friend[]|undefined>
  {
    return await this.http.get<Friend[]>(`http://localhost:8080/friends/friends/${user.id}`).toPromise();
  }

  acceptFriend(friend:AppUser, user:AppUser){
    const payload:Friend = new Friend(0, friend.id, user.id, "Friends");
    return this.http.put(`http://localhost:8080/friends`, payload);
  }

  declineOrRemoveFriend(friend:AppUser, user:AppUser, status:string){
    return this.http.delete(`http://localhost:8080/friends/${user.id}/${friend.id}?status=${status}`);
  }

}
