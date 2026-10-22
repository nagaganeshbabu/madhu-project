import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userData:any={};
  constructor(private router:Router,private sharedService:SharedService) { }

  ngOnInit(): void {
  }
  
  signUp() {
    this.sharedService.SuccessAlert("Password Reseted Successfully");
     this.router.navigate([''])
  }

}
