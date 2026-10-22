import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Title } from '@angular/platform-browser';

import { JwtResponse } from '../models/jwt-response';
import { catchError, of } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  userData: any = {};
  loginpage: boolean = false;
  jwtResponse: JwtResponse = new JwtResponse();
  otpData :any={};
  otpSent:boolean=false;
  constructor(private router: Router,
    private sharedService: SharedService, private titleService: Title,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
   if (localStorage.getItem('CurrentUser') !== null) {
    localStorage.removeItem('CurrentUser');
}
  }

  

  errorMessage: string | null = null;

  successMessage: string | null = null;

  login(userData: { username: string; password: string }) {
this.sharedService.showSpinner();
this.userData.email = this.userData.email?.trim();
this.userData.password = this.userData.password?.trim();
    this.loginService.login(this.userData).pipe(
  catchError((error) => {
    console.error(error); 
    this.sharedService.errorAlert("Internal Server Error");
    this.errorMessage = 'Internal Server Error';
    this.autoHideMessage('error');
    this.successMessage = null;
    return of(null); 
  })
).subscribe((res:any) => {
  if (res && Number(res.statusCode) === 200) {
    this.jwtResponse = res.data;
    if (this.jwtResponse.valid) {
      this.loginService.isLoggedIn = true;
      localStorage.setItem('CurrentUser', JSON.stringify(this.jwtResponse));
      this.autoHideMessage('success');
      this.errorMessage = null;
      if (this.jwtResponse.role === '0') {
       this.router.navigate(['/super-admin-dashboard']);
         this.sharedService.SuccessAlert("SuperAdmin LoggedIn Successfully");
      }else if(this.jwtResponse.role==='1'){
         this.router.navigate(['/master-distrubutor-dashboard']);
         this.sharedService.SuccessAlert("Master Distrubutor LoggedIn Successfully");
      }else if(this.jwtResponse.role==='2'){
          this.router.navigate(['/distrubutor-dashboard']);
         this.sharedService.SuccessAlert("Distrubutor LoggedIn Successfully");
      }else if(this.jwtResponse.role==='3'){
          this.router.navigate(['/retailer-dashboard']);
         this.sharedService.SuccessAlert("Retailer LoggedIn Successfully");
      }else{
         this.router.navigate(['/login']);
         this.sharedService.errorAlert("eRROR Occured");
      }
    }
  }else if (res && res.data === 'User Not Found') {
    this.sharedService.errorAlert(res.data);
    this.errorMessage = 'User Not FOUND';
    this.autoHideMessage('error');
    this.successMessage = null;
  }else if(res &&String (res.statusCode)==="401"){
    this.errorMessage = 'Invalid Credentails';
    this.sharedService.errorAlert("Invalid Credentails");
  }
}).add(()=>{
      this.sharedService.hideSpinner();
    })
  }
  autoHideMessage(type: 'success' | 'error') {
    setTimeout(() => {
      if (type === 'success') {
        this.successMessage = null;
      } else if (type === 'error') {
        this.errorMessage = null;
      }
    }, 3000);
  }

  isloginPage() {
    this.loginpage = true;
  }
handleOTPSubmit(otpData:any) {

}



}
