import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavBarComponent} from './page-basics/nav-bar/nav-bar.component';
import {FooterComponent} from './page-basics/footer/footer.component';
import {SideBarComponent} from './page-basics/side-bar/side-bar.component';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {HeaderComponent} from './page-basics/header/header.component';
import {BrandsListComponent} from './product/brands/brands-list/brands-list.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';


import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {AppRoutingModule} from './app-routing.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BeertypesListComponent} from './product/beertypes/beertypes-list/beertypes-list.component';
import {BeersListComponent} from './product/beers/beers-list/beers-list.component';
import { BrandsAddComponent } from './product/brands/brands-add/brands-add.component';
import { BrandsUpdateComponent } from './product/brands/brands-update/brands-update.component';
import { BeertypesAddComponent } from './product/beertypes/beertypes-add/beertypes-add.component';
import { BeersAddComponent } from './product/beers/beers-add/beers-add.component';
import { BeersUpdateComponent } from './product/beers/beers-update/beers-update.component';
import { ProductPageComponent } from './product/product-page/product-page.component';
import {BeertypesUpdateComponent} from './product/beertypes/beertypes-update/beertypes-update.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AboutEBComponent } from './about-eb/about-eb.component';
import { TastingComponent } from './tasting/tasting.component';
import { BeerDetailsComponent } from './product/beer-details/beer-details.component';


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
    BeersListComponent,
    BrandsAddComponent,
    BrandsUpdateComponent,
    BeertypesAddComponent,
    BeersAddComponent,
    BeersUpdateComponent,
    ProductPageComponent,
    BeertypesUpdateComponent,
    LoginComponent,
    ProfileComponent,
    OrderListComponent,
    AboutEBComponent,
    TastingComponent,
    BeerDetailsComponent
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
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
