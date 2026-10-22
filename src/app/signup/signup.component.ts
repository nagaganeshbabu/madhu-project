import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData:any={};
  UserDetails:any={};
   isUserNameExists!:boolean;
   
   kycStatus1 = [
    { id: "0", name: 'super-admin' }
  ];

  constructor(private titleService:Title,
    private loginService:LoginService,private sharedService:SharedService,private router:Router) { }
    
  ngOnInit(): void {
    this.titleService.setTitle('SignUp');
  }
  

  signUp(userData: any) {
    this.sharedService.showSpinner();
  this.loginService.checkUserNameExists(userData.emailId).subscribe((res) => {
    const userNameExists = Number(res.statusCode) === 302;
      if (!userNameExists) {
      this.loginService.registerUser(userData).subscribe((res: any) => {
        if (res!==null && res.statusCode === "201") {
          this.sharedService.SuccessAlert(res.data);
        } else {
          this.sharedService.errorAlert(res.data);
        }
        this.router.navigate(['/login']);
      });
    } else {
      this.sharedService.errorAlert("Email ID already exists");
      this.router.navigate(['/login']);
    }
  }).add(()=>{
      this.sharedService.hideSpinner();
    })
}



}