import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { SharedService } from "../shared.service";
import { Injectable } from "@angular/core";
import { PayoutConfigDto } from "../models/PayoutConfigDto";
import { CustomResponse } from "../models/custom-response";
import { API_CONSTANTS } from "../api.constants";
import { PageRequest } from "../models/page-request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

   constructor(private httpClient:HttpClient,private sharedService:SharedService) { }


createPaymentGateway(payoutConfig:PayoutConfigDto){
   const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.SAVE_PAYMENT_GATEWAY}`,
    payoutConfig,
    { headers }
  );
}

   getAllPaymentGatewayDetails(pageRequest :PageRequest): Observable<CustomResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_ALL_PAYMENT_DETAILS}`,
    pageRequest,
    { headers }
  );
}

getPaymentGatewayById(payoutId:any){
       const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });
      const params = new HttpParams().set('payoutId', payoutId);   
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.GET_PAYMENT_OUT_ID}`,
       { headers,params}
     );
   }

   activateorDeactivare(payoutId:any){
        const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });
      const params = new HttpParams().set('payoutId', payoutId);   
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.ACTIVATE_OR_DEACTIVATE}`,
       { headers,params}
     );
   }


   activateOrDeactivatePgStatus(updatePayInDetailsDto:any){
   const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
 return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.ACTIVATE_OR_DEACTIVATE_PAYIN_PGS}`,
    updatePayInDetailsDto,
    { headers }
  );
}

   getAllActivePaymentGatewaysList():Observable<CustomResponse>{
     const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });  
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.GET_ALL_ACTIVE_PAYINS}`,
       { headers}
     );   
   }

//PayOut Api Calls
createPayoutPaymentGateway(payoutConfig:PayoutConfigDto){
   const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.SAVE_PAYOUT_GATEWAY}`,
    payoutConfig,
    { headers }
  );
}


   getAllPayoutGatewayDetails(pageRequest :PageRequest): Observable<CustomResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_ALL_PAYOUT_LIST}`,
    pageRequest,
    { headers }
  );
}

getPaymentPayoutGatewayById(payoutId:any){
       const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });
      const params = new HttpParams().set('payoutId', payoutId);   
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.GET_PAYOUT_DETAILS_BY_ID}`,
       { headers,params}
     );
   }



activateOrDeactivatePayoutStatus(payoutId:any){
        const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });
      const params = new HttpParams().set('payoutId', payoutId);   
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.ACTIVATE_OR_INACTIVATE}`,
       { headers,params}
     );
   }

}