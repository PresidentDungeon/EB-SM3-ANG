import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {BrandsListComponent} from './product/brands/brands-list/brands-list.component';
import {BeertypesListComponent} from "./product/beertypes/beertypes-list/beertypes-list.component";
import {BeersListComponent} from "./product/beers/beers-list/beers-list.component";
import {BrandsAddComponent} from "./product/brands/brands-add/brands-add.component";
import {BrandsUpdateComponent} from "./product/brands/brands-update/brands-update.component";
import {BeertypesAddComponent} from "./product/beertypes/beertypes-add/beertypes-add.component";
import {BeersAddComponent} from "./product/beers/beers-add/beers-add.component";
import {BeersUpdateComponent} from "./product/beers/beers-update/beers-update.component";
import {ProductPageComponent} from "./product/product-page/product-page.component";
import {BeertypesUpdateComponent} from './product/beertypes/beertypes-update/beertypes-update.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {AboutComponent} from './about/about.component';
import {OrderListPersonalComponent} from './orders/order-list-personal/order-list-personal.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {OrderListComponent} from './orders/order-list/order-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},                //all
  {path: 'home', component: FrontpageComponent},                    //all
  {path: 'brands', component: BrandsListComponent},                 //Admin
  {path: 'brands/add', component: BrandsAddComponent},              //Admin
  {path: 'brands/update/:id', component: BrandsUpdateComponent},    //Admin
  {path: 'types', component: BeertypesListComponent},               //Admin
  {path: 'types/add', component: BeertypesAddComponent},            //Admin
  {path: 'types/update/:id', component: BeertypesUpdateComponent},  //Admin
  {path: 'beers', component: BeersListComponent},                   //Admin
  {path: 'beers/add', component: BeersAddComponent},                //Admin
  {path: 'beers/update/:id', component: BeersUpdateComponent},      //Admin
  {path: 'shop', component: ProductPageComponent},                  //all
  {path: 'login', component: LoginComponent},                       //all
  {path: 'profile', component: ProfileComponent},                   //logged in
  {path: 'about', component: AboutComponent},                       //all
  {path: 'orders', component: OrderListPersonalComponent},          //logged in
  {path: 'order/:id', component: OrderDetailComponent},             //logged in
  {path: 'orders/all', component: OrderListComponent},              //Admin
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
