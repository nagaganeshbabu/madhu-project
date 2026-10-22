import { Injectable } from "@angular/core";
import { SharedService } from "../shared.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PageRequest } from "../models/page-request";
import { Observable } from "rxjs";
import { CustomResponse } from "../models/custom-response";
import { API_CONSTANTS } from "../api.constants";

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }

 getAllRetailersList(pageRequest: PageRequest, role: any): Observable<CustomResponse> {

  const token = this.sharedService.getTokenService();

  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const params = new HttpParams().set('role', role);

  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_RETAILERS_LIST}`,
    pageRequest,
    { headers, params }
  );
}

  createRetailer(retailerDto:any){
     const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sharedService.getTokenService()}`
    });
    return this.httpClient.post<CustomResponse>(
      `${this.sharedService.baseUrl}${API_CONSTANTS.SAVE_RETAILER}`,
      retailerDto,
      { headers }
    );
  }
  

   getRetailerId(retailerDetailsId:any){
       const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });
      const params = new HttpParams().set('retailerDetailsId', retailerDetailsId);   
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.GET_RETAILER_ID}`,
       { headers,params}
     );
   }


}