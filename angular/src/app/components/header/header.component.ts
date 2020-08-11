import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  email: string = ''; 
  currentUser: IUser;
  currentUserSubscription: Subscription;
  isLoggedIn:boolean=false;
  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit() {   
      this.authService.currentUser.subscribe(user=>{  
       if(user) { 
         this.isLoggedIn = true;
         this.email = user.email 
         
       } else {
        this.isLoggedIn = false;
        this.email = '' 
         
       }
     })

  }

  logout() {
    this.authService.logout();
  } 
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  } 

}
