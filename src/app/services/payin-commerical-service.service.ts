import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { PayinCommericalsDto } from '../models/payin-commericals-dto';
import { CustomResponse } from '../models/custom-response';
import { API_CONSTANTS } from '../api.constants';
import { PageRequest } from '../models/page-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayinCommericalServiceService {

   constructor(private httpClient:HttpClient,private sharedService:SharedService) { }

 savePayInCommericals(payinCommericalsDto:PayinCommericalsDto){
   const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.SAVE_PAYIN_COMMERICALS}`,
    payinCommericalsDto,
    { headers }
  );
 }

  getAllPayInCommericals(pageRequest :PageRequest): Observable<CustomResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_ALL_PAYIN_COMMERICALS}`,
    pageRequest,
    { headers }
  );
}

getPayInDetailsById(payInCommericalsDetailId:any){
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
    const params = new HttpParams().set('payInCommericalsDetailId', payInCommericalsDetailId);   
  return this.httpClient.get<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_PAYIN_DETAILS_BY_ID}`,
    { headers ,params}
  );
}


getPaymentModes(){
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  
  return this.httpClient.get<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_ALL_PAYMENT_MODES}`,
    { headers}
  );
}

payInTxDetails(payin:any){
const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.SAVE_PAYIN_TRN}`,
    payin,
    { headers }
  );

}



}
