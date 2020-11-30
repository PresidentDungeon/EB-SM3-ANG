import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {BrandsListComponent} from './brands/brands-list/brands-list.component';
import {BeertypesListComponent} from "./beertypes/beertypes-list/beertypes-list.component";
import {BeersListComponent} from "./beers/beers-list/beers-list.component";
import {BrandsAddComponent} from "./brands/brands-add/brands-add.component";
import {BrandsUpdateComponent} from "./brands/brands-update/brands-update.component";
import {BeertypesAddComponent} from "./beertypes/beertypes-add/beertypes-add.component";
import {BeersAddComponent} from "./beers/beers-add/beers-add.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: FrontpageComponent},
  {path: 'brands', component: BrandsListComponent},
  {path: 'brands/add', component: BrandsAddComponent},
  {path: 'brands/update/:id', component: BrandsUpdateComponent},
  {path: 'types', component: BeertypesListComponent},
  {path: 'types/add', component: BeertypesAddComponent},
  {path: 'beers', component: BeersListComponent},
  {path: 'beers/add', component: BeersAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
