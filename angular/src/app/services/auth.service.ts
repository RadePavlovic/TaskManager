import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs'; 
import { IUser } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    activated: false,
    createAt: null
  }
 
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  
constructor(private http: HttpClient, private webService: WebRequestService, private router: Router) { 
  this.currentUserSubject= new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser'))); 
  this.currentUser = this.currentUserSubject.asObservable();
}

login(email: string, password: string) {
  return this.webService.login(email, password).pipe(
    shareReplay(),
    tap((res: HttpResponse<any>) => {
      this.setSession(res.body._id, res.body.email, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
      localStorage.setItem('currentUser', JSON.stringify(res.body));
      this.currentUserSubject.next(res.body);

    })
  )
}
signup(user: IUser) {
  return this.webService.signup(user).pipe(
    shareReplay(),
    tap((res: HttpResponse<any>) => {
      this.setSession(res.body._id, res.body.email, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
      this.setCurrentUser(res.body) 
    })
  )
} 
//REFRESH TOKEN
getRefreshToken() {
  return localStorage.getItem('x-refresh-token');
}

// ACCESS TOKEN
getAccessToken() {
  return localStorage.getItem('x-access-token')
}

//Get User 
getUserId() {
  const user=JSON.parse(localStorage.getItem('currentUser'))
  return  user._id
}
//Get Email from localStorage
getEmail() {
  return localStorage.getItem('email')
} 
setAccessToken(accessToken) {
  localStorage.setItem('x-access-token', accessToken)
}

  private setSession(userId: string, email: string, accessToken: string, refreshToken: string) { 
  localStorage.setItem('x-access-token', accessToken);
  localStorage.setItem('x-refresh-token', refreshToken);
}

  private removeSession() { 
  localStorage.removeItem('x-access-token');
  localStorage.removeItem('x-refresh-token');
}

logout() {
  this.removeSession()
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null)
  this.router.navigate(['/login'])


}
getNewAccessToken(){
  return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
    headers: {
      'x-refresh-token': this.getRefreshToken(),
      '_id': this.getUserId()
    },
    observe: 'response'
  }).pipe(tap((res: HttpResponse<any>) => {
    this.setAccessToken(res.headers.get('x-access-token'))
  }))
}
setCurrentUser(user) {
  this.currentUserSubject.next(user)
} 

public get currentUserValue(): IUser {
  return this.currentUserSubject.value;
}


}

