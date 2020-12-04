import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Location} from '@angular/common';
import {UserService} from '../profile/shared/user.service';

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

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {validators: [this.passwordConfirming]});

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordConfirm').value) {
      return {invalid: true};
    }
  }

  loading: boolean = true;
  loginLoad: boolean = false;
  registerLoad: boolean = false;

  saveLogin: boolean = false;
  error: string = '';
  registerError: string = '';

  constructor(private router: Router, private authService: AuthenticationService,
              private userService: UserService, private location: Location) { }

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

  register(): void{

    this.registerLoad = true;

    const registerData = this.registerForm.value;
    const username: string = registerData.username;
    const password: string = registerData.password;

    this.userService.register(username, password).subscribe(success => {

        this.authService.login(username, password).subscribe(success => {
            if(this.saveLogin){
              this.authService.saveLogin(username, password);
            }
            else{
              this.authService.forgetLogin();
            }},
          error => {this.registerError = error.error; this.loginLoad = false;},
          () => {this.loginLoad = false;});
        },
      error => {this.registerError = error.error; this.registerLoad = false;},
      () => {this.location.back(); this.registerLoad = false;});
  }

  goBack(): void{
    this.location.back();
  }

}
