import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { CustomResponse } from '../models/custom-response';

import { login } from '../models/login';
import { UserDetails } from '../models/user-details';
@Injectable({
  providedIn: 'root'
}
)

export class LoginService {

  isLoggedIn!: boolean;

  constructor(private httpClient: HttpClient,
    private router: Router, private sharedService: SharedService) { }

  registerUser(userDetails: UserDetails): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(
      `${this.sharedService.baseUrl}/authenticate/register`,
      userDetails
    );
  }

  login(loginform: login): Observable<CustomResponse> {
    return this.httpClient.post(`${this.sharedService.baseUrl}/authenticate/get_token`, loginform) as Observable<CustomResponse>;
  }

  checkUserNameExists(userName: string): Observable<CustomResponse> {
    const params = new HttpParams().set('userName', userName);
    const options = {
      params: params,
    };
    return this.httpClient.get<CustomResponse>
      (`${this.sharedService.baseUrl}/authenticate/check_user_email_exists`, options);
  }

  forgotPassword(userName: string) {
    const params = new HttpParams().set('userName', userName);
    const options = { params: params };
    return this.httpClient.get<CustomResponse>
      (`${this.sharedService.baseUrl}/authenticate/forgot-password`, options);
  }


  logout() {
    this.sharedService.SuccessAlert('User Logged Out Successfully');
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['/login']);
  }

  getTokenByUserName(userName: string) {
    const params = new HttpParams().set('userName', userName);
    const options = { params: params };
    return this.httpClient.get(`${this.sharedService.baseUrl}/authenticate/get_token_by_email`, options) as Observable<CustomResponse>;
  }
}
