import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes aquí
import { HomeComponent } from './components/home/home.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { NewOfferComponent } from './components/new-offer/new-offer.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'business/offers', component: ListOffersComponent },
  { path: 'admin/offers/new', component: NewOfferComponent},
  { path: 'admin/offers/edit/:id', component: EditOfferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}