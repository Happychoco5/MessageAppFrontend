import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/Appuser';
import { JwtDecoderService } from './jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http:HttpClient) { }

  public getUserWithUsername(username:string){
    return this.http.get<AppUser>(`http://localhost:8080/appusers/${username}`);
  }

  public async getUserWithId(id:number):Promise<AppUser|undefined>{
    return await this.http.get<AppUser>(`http://localhost:8080/appusers/id/${id}`).toPromise();
  }
}
