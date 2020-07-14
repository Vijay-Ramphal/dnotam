import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    authType: String = '';
    title: String = '';
    //errors: Errors = {errors: {}};
    isSubmitting = false;
    authForm: FormGroup;
  
    constructor(
        private serviceObject:AppService,
 
      //private userService: UserService,
      private fb: FormBuilder
    ) {
      // use FormBuilder to create a form group
      this.authForm = this.fb.group({
        'username': ['', Validators.required],
        'password': ['', Validators.required]
      });
    }
  
    ngOnInit() {
    //   this.route.url.subscribe(data => {
    //     // Get the last piece of the URL (it's either 'login' or 'register')
    //     this.authType = data[data.length - 1].path;
    //     // Set a title for the page accordingly
    //     this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    //     // add form control for username if this is the register page
    //     if (this.authType === 'register') {
    //       this.authForm.addControl('username', new FormControl());
    //     }
    //   });
    }
  
    submitForm() {
      this.isSubmitting = true;
      //this.errors = {errors: {}};
  
      const credentials = this.authForm.value;
      this.serviceObject.attemptAuth(credentials);
    }
}