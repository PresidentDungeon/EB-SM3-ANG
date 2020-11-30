import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loading: boolean = true;
  loginLoad: boolean = false;

  saveLogin: boolean = false;
  error: string = '';

  constructor(private router: Router, private authService: AuthenticationService,
              private location: Location) { }

  ngOnInit(): void {

    this.authService.logout();

    const loginInfo = this.authService.getLoginInformation();
    if (loginInfo !== null) {
      this.loginForm.patchValue({
        username: loginInfo.username,
        password: loginInfo.password
      });
      this.saveLogin = true;
    }
    this.loading = false;
  }

  login(): void{

    this.loginLoad = true;

    const loginData = this.loginForm.value;
    const username: string = loginData.username;
    const password: string = loginData.password;

    this.authService.login(username, password).subscribe(success => {
        if(this.saveLogin){
          this.authService.saveLogin(username, password);
        }
        else{
          this.authService.forgetLogin();
        }},
      error => {this.error = error.error; this.loginLoad = false;},
      () => {this.location.back(); this.loginLoad = false;});
  }

  goBack(): void{
    this.location.back();
  }

}
