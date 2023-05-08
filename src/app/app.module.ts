import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewOfferComponent } from './components/new-offer/new-offer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ListOffersComponent,
    CreateOfferComponent,
    EditOfferComponent,
    FooterComponent,
    NewOfferComponent,
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
