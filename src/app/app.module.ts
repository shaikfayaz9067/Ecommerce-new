import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this line for animations
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddToCartComponent } from './components/addtocart/addtocart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Import Angular Material modules
import { MatCardModule } from '@angular/material/card'; // For mat-card
import { MatButtonModule } from '@angular/material/button'; // For mat-button
import { MatFormFieldModule } from '@angular/material/form-field'; // For mat-form-field
import { MatInputModule } from '@angular/material/input'; // For matInput
import { MatToolbarModule } from '@angular/material/toolbar'; // For mat-toolbar
import { OrderComponent } from './components/order/order.component';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddToCartComponent,
    AddressComponent,
    NavbarComponent,
    HomeComponent,
    OrderComponent,
    LoginComponent,
    CheckoutComponent,
    SignupComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    AppRoutingModule,
    FormsModule,
    MatCardModule, // Include Material Card Module
    MatButtonModule, // Include Material Button Module
    MatFormFieldModule, // Include Material Form Field Module
    MatInputModule, // Include Material Input Module
    MatToolbarModule, // Include Material Toolbar Module
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
