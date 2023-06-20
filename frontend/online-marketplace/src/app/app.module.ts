import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ItemsService } from '../services/items.service';
import { LoginComponent } from './components/login/login.component';
import { MarketComponent } from './components/market/market.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from 'src/services/auth.service';
import { LogoutComponent } from './components/logout/logout.component';
import { AdminHubComponent } from './components/admin-hub/admin-hub.component';
import { ItemComponent } from './components/item/item.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MarketService } from 'src/services/market.service';

import { TokenInterceptor } from './token-interceptor';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MarketComponent,
    RegisterComponent,
    UserComponent,
    LogoutComponent,
    AdminHubComponent,
    ItemComponent,
    FilterFormComponent,
    ItemDetailsComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [
    ItemsService, 
    AuthService,
    MarketService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
