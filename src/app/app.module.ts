import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MainComponent } from './main/main.component';
import { RouterLinkActiveExactDirective } from './main/appRouterLinkActiveExact.directive';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MustMatchDirective } from './must-match.directive';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';

import { TimeFormatPipe } from './time-format.pipe';
import { MasterDistrubutorsListComponent } from './master-distrubutors-list/master-distrubutors-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateMasterDistrubutorComponent } from './create-master-distrubutor/create-master-distrubutor.component';
import { DistrubutosListComponent } from './distrubutos-list/distrubutos-list.component';
import { CreateDistrubutorComponent } from './create-distrubutor/create-distrubutor.component';
import { RetailersListComponent } from './retailers-list/retailers-list.component';
import { CreateRetailerComponent } from './create-retailer/create-retailer.component';
import { SavePaymentGatewayComponent } from './save-payment-gateway/save-payment-gateway.component';
import { PaymentGatewayListComponent } from './payment-gateway-list/payment-gateway-list.component';
import { MasterDistDashboardComponent } from './master-dist-dashboard/master-dist-dashboard.component';
import { DistrubutorDashboardComponent } from './distrubutor-dashboard/distrubutor-dashboard.component';
import { RetailerDashboardComponent } from './retailer-dashboard/retailer-dashboard.component';
import { CommericalApiComponent } from './commerical-api/commerical-api.component';
import { CommericalsPayinListComponent } from './commericals-payin-list/commericals-payin-list.component';
import { PayoutPaymentGatewaysListComponent } from './payout-payment-gateways-list/payout-payment-gateways-list.component';
import { CreatePayoutComponent } from './create-payout/create-payout.component';
import { CashFreeTranscationPageComponent } from './cash-free-transcation-page/cash-free-transcation-page.component';






// Import FormsModule
@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    MainComponent,
    RouterLinkActiveExactDirective,
    ProfileComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SuperAdminDashboardComponent,
    SuperAdminDashboardComponent,
    UserDropdownComponent,
    TimeFormatPipe,
    MasterDistrubutorsListComponent,
    CreateMasterDistrubutorComponent,
    DistrubutosListComponent,
    CreateDistrubutorComponent,
    RetailersListComponent,
    CreateRetailerComponent,
    SavePaymentGatewayComponent,
    PaymentGatewayListComponent,
    MasterDistDashboardComponent,
    DistrubutorDashboardComponent,
    RetailerDashboardComponent,
    CommericalApiComponent,
    CommericalsPayinListComponent,
    PayoutPaymentGatewaysListComponent,
    CreatePayoutComponent,
    CashFreeTranscationPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    NgSelectModule,
   MatSliderModule,
  MatSlideToggleModule,
    NgSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
     NgbModule,
     NgxSpinnerModule.forRoot(),
     NgxPaginationModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
