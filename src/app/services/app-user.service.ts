import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/Appuser';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http:HttpClient) { }
  
  public getUserWithUsername(username:string){
    return this.http.get<AppUser>(`http://localhost:8080/appusers/${username}`);
  }
}
