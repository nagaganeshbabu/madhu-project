import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Title } from '@angular/platform-browser';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userData: any = {};
  loginpage: boolean = false;
  selectedTab: string = 'email';

  constructor(private router: Router,
    private sharedService: SharedService, private loginService: LoginService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Forgot-Password');
  }

  errorMessage: string | null = null;
  successMessage: string | null = null;

  submit(userData: { email: string}) {
    let email=   userData.email;
        this.loginService.forgotPassword(email).subscribe((res => {
          if (String(res.statusCode) === "201") {
            this.sharedService.SuccessAlert("Forgot Password Mail Successfully");
          }else if(String(res.statusCode) === "500"){
             this.sharedService.errorAlert("User Not Found");
          }
          this.router.navigate(['']);
        }))
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

}

