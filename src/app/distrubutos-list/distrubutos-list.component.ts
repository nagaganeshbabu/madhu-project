import { Component, OnInit } from '@angular/core';
import { DistrubutorService } from '../services/distrubutor.service';
import { SharedService } from '../shared.service';
import { PageRequest } from '../models/page-request';
import { CustomResponse } from '../models/custom-response';
import { MasterDistrubutorService } from '../services/master-distrubutor.service';

@Component({
  selector: 'app-distrubutos-list',
  templateUrl: './distrubutos-list.component.html',
  styleUrls: ['./distrubutos-list.component.css']
})
export class DistrubutosListComponent implements OnInit {
  distrubutorsList: any[] = [];
  role!: string;
  id!:any;
  ngOnInit() {
    this.getDistrubutorsList();
  }

  constructor(private distrubutorService: DistrubutorService,
    public sharedService: SharedService,private masterDistrubutorService:MasterDistrubutorService) {
const currentUser = JSON.parse(localStorage.getItem('CurrentUser') );
this.id=  currentUser?.role;
  }


  getDistrubutorsList() {
    let roleId = this.sharedService.getUserDetailId();
    if (roleId?.includes('SA')) {
      this.role = 'SA';
    } else if (roleId?.includes('MD')) {
      this.role = 'MD';
    }

    const pageRequest: PageRequest = {
      pageNumber: this.sharedService.page === 1 ? 1 : this.sharedService.page,
      pageSize: this.sharedService.tableSize,
      id: this.sharedService.getUserDetailId()
    };
    this.distrubutorService.getAllDistrubutorsList(pageRequest, this.role).subscribe({
      next: (res: any) => {
        if (res?.statusCode === '200' && res.data) {
          this.distrubutorsList = res.data.list;
          this.sharedService.totalPages = res.data.totalPages;
          this.sharedService.totalElements = res.data.totalElements;
        }
      },
      error: (err) => {
        console.error('Error fetching master distributors:', err);
      }
    });
  }


  onTableDataChange(event: number): void {
    this.sharedService.page = event;
    this.getDistrubutorsList();
  }

  block(distrubutorId: string, status: string) {
    if (distrubutorId != null && status != null) {
      console.log(status);

       this.masterDistrubutorService.blockMasterDistrubutorById(distrubutorId,'db')
      .subscribe((res:CustomResponse)=>{
        if(res.statusCode==='201'){
          this.sharedService.SuccessAlert("Block Status Changed");
        }else{
          this.sharedService.errorAlert("Block Status Failed");
        }
        setTimeout(() => {
       this. getDistrubutorsList();
    }, 1500);
      })
    }

    }
  }

  
