import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AppComponent } from './app.component';
import { RoleGuard } from './guards/role.guard';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { MasterDistrubutorsListComponent } from './master-distrubutors-list/master-distrubutors-list.component';
import { CreateMasterDistrubutorComponent } from './create-master-distrubutor/create-master-distrubutor.component';
import { DistrubutosListComponent } from './distrubutos-list/distrubutos-list.component';
import { CreateDistrubutorComponent } from './create-distrubutor/create-distrubutor.component';
import { RetailersListComponent } from './retailers-list/retailers-list.component';
import { CreateRetailerComponent } from './create-retailer/create-retailer.component';
import { SavePaymentGatewayComponent } from './save-payment-gateway/save-payment-gateway.component';
import { PaymentGatewayListComponent } from './payment-gateway-list/payment-gateway-list.component';
import { MasterDistDashboardComponent } from './master-dist-dashboard/master-dist-dashboard.component';
import { DistrubutorDashboardComponent } from './distrubutor-dashboard/distrubutor-dashboard.component';
import { CommericalApiComponent } from './commerical-api/commerical-api.component';
import { CommericalsPayinListComponent } from './commericals-payin-list/commericals-payin-list.component';
import { PayoutPaymentGatewaysListComponent } from './payout-payment-gateways-list/payout-payment-gateways-list.component';
import { CreatePayoutComponent } from './create-payout/create-payout.component';
import { RetailerDashboardComponent } from './retailer-dashboard/retailer-dashboard.component';
import { CashFreeTranscationPageComponent } from './cash-free-transcation-page/cash-free-transcation-page.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', component: AppComponent, canActivate: [RoleGuard], data: { roles: ['0', '1', '2'] } },

  //paymetrix internall use 

  
  { path: 'profile', component: ProfileComponent, canActivate: [RoleGuard], data: { roles: ['0', '1', '2'] } },



  //master-distrubutors 
 
  { path: 'master-distrubutors', component: MasterDistrubutorsListComponent, canActivate: [RoleGuard], data: { roles: ['0'] } },
  { path: 'create-master-distrubutor', component: CreateMasterDistrubutorComponent, canActivate: [RoleGuard], data: { roles: ['0'] } },
  { path: 'create-master-distrubutor/:mid', component: CreateMasterDistrubutorComponent, canActivate: [RoleGuard], data: { roles: ['0'] } },


  //dashboard 
  { path: 'super-admin-dashboard', 
    component: SuperAdminDashboardComponent, canActivate: [RoleGuard], data: { roles: ['0'] } },
  {path:'master-distrubutor-dashboard',component:MasterDistDashboardComponent,
    canActivate: [RoleGuard], data: { roles: ['1'] } },
  {path:'distrubutor-dashboard',component:DistrubutorDashboardComponent,
    canActivate: [RoleGuard], data: { roles: ['2'] } },
//
   {path:'retailer-dashboard',component:RetailerDashboardComponent,
    canActivate: [RoleGuard], data: { roles: ['3'] } },
  
    //distrubutors
  { path: 'distrubutors-list', component: DistrubutosListComponent, canActivate: [RoleGuard], data: { roles: ['0', '1'] } },
  { path: 'create-distrubutor', component: CreateDistrubutorComponent, canActivate: [RoleGuard], data: { roles: ['1'] } },
  { path: 'create-distrubutor/:did', component: CreateDistrubutorComponent, canActivate: [RoleGuard], data: { roles: ['1'] } },

  //Retailers 
  {path:'retailers-list',component:RetailersListComponent, canActivate: [RoleGuard], data: { roles: ['0','1', '2'] }},
  { path: 'create-retailer', component: CreateRetailerComponent},
  { path: 'create-retailer/:rid', component: CreateRetailerComponent, canActivate: [RoleGuard], data: { roles: ['1','2'] } },

//payment gateway 
{path:'add-payment-gateway',component:SavePaymentGatewayComponent,canActivate: [RoleGuard], data: { roles: ['0'] }},
{path:'payment-gateway-list',component:PaymentGatewayListComponent,canActivate: [RoleGuard], data: { roles: ['0'] }},
{path:'add-payment-gateway/:pgid',component:SavePaymentGatewayComponent,canActivate: [RoleGuard], data: { roles: ['0'] }},

//Payin Commerical Slabs 
{path:'commericals-payin-list',component:CommericalsPayinListComponent,canActivate: [RoleGuard], data: { roles: ['0']}},
{path:'create-payin-cslab',component:CommericalApiComponent,canActivate: [RoleGuard], data: { roles: ['0']}},
{path:'create-payin-cslab/:payinId',component:CommericalApiComponent,canActivate: [RoleGuard], data: { roles: ['0']}},

//payout gateways list 
{path:'payment-payout-gateways-list',component:PayoutPaymentGatewaysListComponent,canActivate: [RoleGuard], data: { roles: ['0']}},
{path:'add-payout-payment-gateway',component:CreatePayoutComponent,canActivate: [RoleGuard], data: { roles: ['0']}},
{path:'add-payout-payment-gateway/:payoutId',component:CreatePayoutComponent,canActivate: [RoleGuard], data: { roles: ['0']}},
{path:'cashFreeTranscationPage',component:CashFreeTranscationPageComponent},



{ path: '**', redirectTo: '/login', pathMatch: 'full' },
{ path: '', redirectTo: '/login', pathMatch: 'full' }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
