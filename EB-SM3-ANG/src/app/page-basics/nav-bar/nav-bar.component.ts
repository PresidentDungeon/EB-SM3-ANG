import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  profileOpen: boolean = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  outsideClick(): void{
    this.profileOpen = false;
  }
}
