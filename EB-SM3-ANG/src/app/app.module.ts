import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import { WelcomeComponent } from './welcome/welcome.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FooterComponent} from "./footer/footer.component";
import {SideBarComponent } from './side-bar/side-bar.component';
import {CollapseModule} from "ngx-bootstrap/collapse";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavBarComponent,
    FooterComponent,
    SideBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ProgressbarModule,
    CollapseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
