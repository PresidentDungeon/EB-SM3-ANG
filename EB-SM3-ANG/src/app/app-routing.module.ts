import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {BrandsListComponent} from './brands/brands-list/brands-list.component';
import {BeertypesListComponent} from "./beertypes/beertypes-list/beertypes-list.component";
import {BeersListComponent} from "./beers/beers-list/beers-list.component";
import {BrandsAddComponent} from "./brands/brands-add/brands-add.component";
import {BrandsUpdateComponent} from "./brands/brands-update/brands-update.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: FrontpageComponent},
  {path: 'brands', component: BrandsListComponent},
  {path: 'types', component: BeertypesListComponent},
  {path: 'beers', component: BeersListComponent},
  {path: 'brands/add', component: BrandsAddComponent},
  {path: 'brands/update/:id', component: BrandsUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
