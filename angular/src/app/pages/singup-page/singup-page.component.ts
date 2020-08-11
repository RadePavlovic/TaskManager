import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpResponse } from '@angular/common/http';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-singup-page',
  templateUrl: './singup-page.component.html',
  styleUrls: ['./singup-page.component.scss']
})
export class SingupPageComponent implements OnInit {

  signingIn: boolean = false;
  registerForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private authService: AuthService, private tostr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  } 
// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

  onSingUpButtonClicked() { 
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService.signup(this.registerForm.value).subscribe((res: HttpResponse<any>) => {
          this.signingIn = true;
          this.tostr.success('Successfully created account!', '', {
            progressBar: true,
            timeOut: 1500
          })
          setTimeout(() => {
            this.router.navigateByUrl('/login')
          }, 1500);
        
      },(err) => {
        this.signingIn=false;
          this.tostr.error('Email already exist!', '', {
            progressBar: true,
            timeOut: 1500
          })
      })

    }

  }

}
