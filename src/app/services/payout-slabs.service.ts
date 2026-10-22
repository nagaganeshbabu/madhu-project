import { Injectable } from "@angular/core";
import { SharedService } from "../shared.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CustomResponse } from "../models/custom-response";
import { Observable } from "rxjs";
import { API_CONSTANTS } from "../api.constants";
import { SlabConfigDto } from "../models/SlabConfigDto";

@Injectable({
  providedIn: 'root'
})
export class PayoutSlabsService {

   constructor(private httpClient:HttpClient,private sharedService:SharedService) { }

   getAllPaymentGateways(): Observable<CustomResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.get<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_ALL_PAYOUTS}`,
    { headers }
  );
}
}