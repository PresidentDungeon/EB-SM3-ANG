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
import {OrderListComponent} from './orders/order-list/order-list.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: FrontpageComponent},
  {path: 'brands', component: BrandsListComponent},
  {path: 'brands/add', component: BrandsAddComponent},
  {path: 'brands/update/:id', component: BrandsUpdateComponent},
  {path: 'types', component: BeertypesListComponent},
  {path: 'types/add', component: BeertypesAddComponent},
  {path: 'types/update/:id', component: BeertypesUpdateComponent},
  {path: 'beers', component: BeersListComponent},
  {path: 'beers/add', component: BeersAddComponent},
  {path: 'beers/update/:id', component: BeersUpdateComponent},
  {path: 'shop', component: ProductPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'about', component: AboutComponent},
  {path: 'orders', component: OrderListComponent},
  {path: 'order/:id', component: OrderDetailComponent},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
