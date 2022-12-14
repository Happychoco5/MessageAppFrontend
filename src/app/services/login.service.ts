import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  async login(json:string):Promise<JSON | null>{
    const observable = this.getLogin(json);
    const savedJson = await firstValueFrom(observable);

    return savedJson.body;
  }

  getLogin(json:string){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const newJSON:JSON = JSON.parse(json);
    return this.http.post<JSON>("https://messageapp.orangebay-520ae6cb.centralus.azurecontainerapps.io/login", newJSON, {responseType: 'text' as 'json', observe: 'response', headers: headers}).pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse){
    if(error.status == 400 || error.status == 404 || error.status === 500){
      alert("Username or password is incorrect.");
      return throwError(() => new Error('Username or password is incorrect'));
    }
    else{
      console.log(error.status);
      return throwError(() => new Error('An error occurred. Please try again later.'))
    }
  }
}
