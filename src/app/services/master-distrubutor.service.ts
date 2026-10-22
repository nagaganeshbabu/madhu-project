import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { CustomResponse } from '../models/custom-response';
import { API_CONSTANTS } from '../api.constants';
import { PageRequest } from '../models/page-request';
import { MasterDistrubutor } from '../models/master-distrubutor';

@Injectable({
  providedIn: 'root'
})
export class MasterDistrubutorService {

   constructor(private httpClient:HttpClient,private sharedService:SharedService) { }


   getAllMasterDistrubutorsList(pageRequest :PageRequest): Observable<CustomResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.GET_MASTER_DISTRUBUTORS_LIST}`,
    pageRequest,
    { headers }
  );
}

createMasterDistrubutor(masterDto:MasterDistrubutor){
   const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });
  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.SAVE_MASTER_DISTRUBUTORS}`,
    masterDto,
    { headers }
  );
}


 getMasterDistrubutorById(masterDistrubutorDetailsId:any){
       const headers = new HttpHeaders({
       Authorization: `Bearer ${this.sharedService.getTokenService()}`
     });
      const params = new HttpParams().set('masterDistrubutorDetailsId', masterDistrubutorDetailsId);   
      return this.httpClient.get<CustomResponse>(
       `${this.sharedService.baseUrl}${API_CONSTANTS.GET_MASTER_DISTRUBUTORS_ID}`,
       { headers,params}
     );
   }

 blockMasterDistrubutorById(id: any, role: any) {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.sharedService.getTokenService()}`
  });

  const params = new HttpParams().set('id', id).set('role', role);

  return this.httpClient.post<CustomResponse>(
    `${this.sharedService.baseUrl}${API_CONSTANTS.BLOCK_MASTER_DISTRUBUTORS}`,
    {}, 
    { headers, params }
  );
}

}