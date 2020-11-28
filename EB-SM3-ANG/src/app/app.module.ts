import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FooterComponent} from './footer/footer.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {HeaderComponent} from './header/header.component';
import {BrandsListComponent} from './brands/brands-list/brands-list.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {ModalModule} from 'ngx-bootstrap/modal';


import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {AppRoutingModule} from './app-routing.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BeertypesListComponent} from './beertypes/beertypes-list/beertypes-list.component';
import {BeersListComponent} from './beers/beers-list/beers-list.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    SideBarComponent,
    FrontpageComponent,
    HeaderComponent,
    BrandsListComponent,
    BeertypesListComponent,
    BeersListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ProgressbarModule,
    CollapseModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
