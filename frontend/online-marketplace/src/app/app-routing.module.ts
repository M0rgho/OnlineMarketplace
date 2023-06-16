import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { MarketComponent } from './components/market/market.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHubComponent } from './components/admin-hub/admin-hub.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'market', component: MarketComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'user/:username', component: UserComponent},
  { path: 'admin', component: AdminHubComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**',redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
