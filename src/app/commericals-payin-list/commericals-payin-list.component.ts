import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { PageRequest } from '../models/page-request';
import { PayinCommericalServiceService } from '../services/payin-commerical-service.service';
import { PayinCommericalsDto } from '../models/payin-commericals-dto';

@Component({
  selector: 'app-commericals-payin-list',
  templateUrl: './commericals-payin-list.component.html',
  styleUrls: ['./commericals-payin-list.component.css']
})
export class CommericalsPayinListComponent  implements OnInit {

commericalsList: Array<PayinCommericalsDto> = [];

  private routeParamSub: any;
  isEdit = false;

constructor(public sharedService: SharedService,
  public commericalsService:PayinCommericalServiceService)
{}

ngOnInit(): void {
  this.getAllCommericalsPayInList();
}

  getAllCommericalsPayInList() {
    const pageRequest: PageRequest = {
      pageNumber: this.sharedService.page === 1 ? 1 : this.sharedService.page,
      pageSize: this.sharedService.tableSize,
      id: this.sharedService.getUserDetailId()
    };
    this.commericalsService.getAllPayInCommericals(pageRequest).subscribe({
      next: (res: any) => {
        if (res?.statusCode === '200' && res.data) {
          this.commericalsList= res.data.list;
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
    this.getAllCommericalsPayInList();
  }
  
}
