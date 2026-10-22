import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedDate!: any;
  sevaChartData: any[] = [];
  prasadhamChartData: any[] = [];  
  donationChartData: any[] = [];
  darshanamChartData: any[] = [];
  totalAmountSeva!: number;
  totalAmountPrasadham!:number; 
  totalAmountDonation!:number; 
  totalAmountDarshanam!:number; 

  constructor(
    private titleService: Title,
    private sharedService: SharedService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
   
  }

  
}
