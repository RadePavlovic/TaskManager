import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, BehaviorSubject } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service'; 
@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  refreshingAccessToken: boolean = false; 
  constructor(private authService:AuthService) { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> { 
      request = this.addAuthHeader(request)

      return next.handle(request).pipe(
        catchError((error:HttpErrorResponse) => { 
          if(error.status == 401 && !this.refreshingAccessToken) {  
           return this.refreshAccessToken().pipe(
              switchMap(()=> {
                request = this.addAuthHeader(request)
                return next.handle(request)
              }),catchError(err => {
                console.log(err)
                this.authService.logout();
                return empty();
                
              })
            )
          }
          return throwError(error)
         
        })
      )


    }

    addAuthHeader(request: HttpRequest<any>) {
      // get the access token
      const token = this.authService.getAccessToken();
  
      if (token) {
        // append the access token to the request header
        return request.clone({
          setHeaders: {
            'x-access-token': token
          }
        })
      }
      return request;
    }

    refreshAccessToken() {
      this.refreshingAccessToken = true;
      return this.authService.getNewAccessToken().pipe(
        tap(()=> {
          this.refreshingAccessToken = false;
          console.log("Access Token Refreshed"); 
        })
      )
    }
  
  }