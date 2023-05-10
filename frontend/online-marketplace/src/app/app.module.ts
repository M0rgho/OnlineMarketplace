import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ItemsService } from '../services/items.service';
import { LoginComponent } from './components/login/login.component';
import { MarketComponent } from './components/market/market.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from 'src/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MarketComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ItemsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
