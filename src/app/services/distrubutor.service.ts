import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { PageRequest } from '../models/page-request';
import { Observable } from 'rxjs';
import { CustomResponse } from '../models/custom-response';
import { API_CONSTANTS } from '../api.constants';
import { DistrubutorDto } from '../models/DistrubutorDto';

@Injectable({
  providedIn: 'root'
})
export class DistrubutorService {


   constructor(private httpClient:HttpClient,private sharedService:SharedService) { }


   getAllDistrubutorsList(pageRequest :PageRequest,type:any): Observable<CustomResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
   const params = new HttpParams().set('type', type);
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_DISTRUBUTORS_LIST}`,
    pageRequest,
    { headers ,params}
  );
}


createDistrubutor(distrubutorDto:DistrubutorDto){
   const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.SAVE_DISTRUBUTORS}`,
    distrubutorDto,
    { headers }
  );
}

 getDistrubutorById(distrubutorDetailId:any){
       const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });
      const params = new HttpParams().set('distrubutorDetailsId', distrubutorDetailId);   
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.GET_DISTRUBUTORS_ID}`,
       { headers,params}
     );
   }


}
