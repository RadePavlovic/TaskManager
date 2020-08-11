import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService,private tostr:ToastrService, private formBuilder: FormBuilder) {
    if (!this.authService.currentUserValue) { 
      this.router.navigate(['/']);
  }
   }
  loginForm: FormGroup;
  submitted = false;

  ngOnInit() { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  get f() {
    return this.loginForm.controls
  }
  onLoginButtonClicked() {
    var email = this.loginForm.controls['email'].value
    var password = this.loginForm.controls['password'].value
    this.submitted = true;
    if(this.loginForm.valid){
      this.authService.login(email,password).subscribe((res:any)=> {
       this.router.navigateByUrl('/lists')
      },(error) => {
        console.log(error); 
        this.submitted=false;
        this.tostr.warning(error.error,'',{
          timeOut:1500,
          progressBar:true
        })
        
      })
    }
  
  }

}
