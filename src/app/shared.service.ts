import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'
import { TYPE } from './Enums/values.constants';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  payoutId!:string;
  page: number = 1;
    totalPages: number = 0;
    totalElements: number = 0;
    tableSize: number = 10;
    private currentUser: any = null;
    
  constructor(public spinner: NgxSpinnerService) { }
  
   showSpinner() {
    this.spinner.show();
  }

  hideSpinner(){
   this.spinner.hide();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  getUserDetailId(): string | null {
  const currentUser = JSON.parse(localStorage.getItem('CurrentUser') );
  return currentUser?.userDetailId;
}

getDevansthanamId():string |null{
   const currentUser = JSON.parse(localStorage.getItem('CurrentUser') );
  return currentUser?.devansthamDetailId;
}
getTokenService(): string | null {

  if (this.currentUser?.jwttoken) {
    return this.currentUser.jwttoken;
  }

  const enc = localStorage.getItem('CurrentUser');
  if (enc) {
    try {
      this.currentUser = JSON.parse(enc); // ✅ FIX
      return this.currentUser?.jwttoken ?? null;
    } catch (error) {
      return null;
    }
  }

  return null;
}



  
    public baseUrl = environment.apiUrl;
 
  SuccessAlert(title:string){
    Swal.fire({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      icon:  TYPE.SUCCESS,
      timerProgressBar:false,
      timer: 3000,
      title: title
    })
  }
  errorAlert(title:string){
    Swal.fire({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      icon:  TYPE.ERROR,
      timerProgressBar:false,
      timer: 3000,
      title: title
    })
  }

}
