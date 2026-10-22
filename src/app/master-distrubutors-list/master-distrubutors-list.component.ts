import { Component, OnInit } from '@angular/core';
import { MasterDistrubutorService } from '../services/master-distrubutor.service';
import { PageRequest } from '../models/page-request';
import { CustomResponse } from '../models/custom-response';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-master-distrubutors-list',
  templateUrl: './master-distrubutors-list.component.html',
  styleUrls: ['./master-distrubutors-list.component.css']
})
export class MasterDistrubutorsListComponent implements OnInit {

  masterDistributors: any[] = [];
  

  constructor(private masterDistributorService: MasterDistrubutorService,
    public sharedService: SharedService) { }

  ngOnInit(): void {
    this.getMasterDistributors();
  }


  getMasterDistributors(): void {
    const pageRequest: PageRequest = {
      pageNumber: this.sharedService.page === 1 ? 1 : this.sharedService.page,
      pageSize: this.sharedService.tableSize,
      id: this.sharedService.getUserDetailId()
    };

    this.masterDistributorService.getAllMasterDistrubutorsList(pageRequest).subscribe({
      next: (res: any) => {
        if (res?.statusCode === '200' && res.data) {
          this.masterDistributors = res.data.list;
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
    this.getMasterDistributors();
  }

  block(masterDistributorDetailId:string,status:string){
    if(masterDistributorDetailId!=null && status!=null){
      console.log(masterDistributorDetailId);
      console.log(status);

      this.masterDistributorService.blockMasterDistrubutorById(masterDistributorDetailId,'md')
      .subscribe((res:CustomResponse)=>{
        if(res.statusCode==='201'){
          this.sharedService.SuccessAlert("Block Status Changed");
        }else{
          this.sharedService.errorAlert("Block Status Failed");
        }  setTimeout(() => {
         this. getMasterDistributors();
    }, 1500);
      })
    }
  }
}
