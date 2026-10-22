import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CustomResponse } from 'src/app/models/custom-response';
import { LoginService } from 'src/app/services/login.service';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit ,AfterContentInit{
  role!: string;
  id!: string;
  userInfoData: any = {};
  constructor(private sharedService: SharedService, 
 private loginService:LoginService) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.role = currentUser?.role;
    this.id = currentUser?.userDetailId;

  }
  ngOnInit(): void {
   
  }
  ngAfterContentInit(): void {
     this.getAllDetailsById();
  }

  getAllDetailsById() {
  
  }

  updateUserData(userInfoData: any) {
   
  }

  updateTokenDetails(){
  
  }

  updatePassword(pwd:any){
   
  }
}
