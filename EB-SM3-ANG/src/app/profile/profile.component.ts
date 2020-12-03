import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './shared/user.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {User} from './shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userForm = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(0)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(0)]),
    email: new FormControl('', [Validators.required]),
    pNumber: new FormControl('', []),
    streetName: new FormControl('', [Validators.required, Validators.minLength(0)]),
    postalCode: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9999)]),
    cityName: new FormControl('', [Validators.required]),
  });


  loading: boolean = false;
  foundUserInfo: boolean = false;
  error: string = '';

  user: User = null

  constructor(private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  loadUser(): void{
    const userID = this.authService.getID();
    this.userService.getUserById(userID).subscribe((user) => {this.user = user}, (error) => {this.error = error.error});
  }

  createCustomerInfo(): void
  {}

}
