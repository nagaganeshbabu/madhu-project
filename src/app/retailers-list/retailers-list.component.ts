import { Component, OnInit } from '@angular/core';
import { MasterDistrubutorService } from '../services/master-distrubutor.service';
import { PageRequest } from '../models/page-request';
import { SharedService } from '../shared.service';
import { CustomResponse } from '../models/custom-response';
import { RetailerService } from '../services/retailer.service';
import { PaymentGatewayService } from '../services/payment-gateway.service';
declare var bootstrap: any;
@Component({
  selector: 'app-retailers-list',
  templateUrl: './retailers-list.component.html',
  styleUrls: ['./retailers-list.component.css']
})

export class RetailersListComponent implements OnInit {
  retailerList: any[] = [];
  role!: string;
  id!: any;
  paymentGatewaysList: any[] = [];
  selectedRetailer: any;
  updatePayInDetailsDto:any={};


  ngOnInit() {
    this.getDistrubutorsList();
  }


  constructor(
    public sharedService: SharedService,
    public retailerService: RetailerService,
    private paymentService: PaymentGatewayService,
     private masterDistrubutorService: MasterDistrubutorService) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.id = currentUser?.role;
  }


  getDistrubutorsList() {
    let roleId = this.sharedService.getUserDetailId();
    if (roleId?.includes('MD')) {
      this.role = 'y';
    } else if (roleId?.includes('DB')) {
      this.role = 'n';
    } else if (roleId?.includes('SA')) {
      this.role = 's';
    }

    const pageRequest: PageRequest = {
      pageNumber: this.sharedService.page === 1 ? 1 : this.sharedService.page,
      pageSize: this.sharedService.tableSize,
      id: this.sharedService.getUserDetailId()
    };
    this.retailerService.getAllRetailersList(pageRequest, this.role).subscribe({
      next: (res: any) => {
        if (res?.statusCode === '200' && res.data) {
          this.retailerList = res.data.list;
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

  block(retailerId: string, status: string) {
    if (retailerId != null && status != null) {
      console.log(status);
      this.masterDistrubutorService.blockMasterDistrubutorById(retailerId, 'rd')
        .subscribe((res: CustomResponse) => {

          if (res.statusCode === '201') {
            this.sharedService.SuccessAlert("Block Status Changed");
          } else {
            this.sharedService.errorAlert("Block Status Failed");
          } setTimeout(() => {
            this.getDistrubutorsList();
          }, 1500);
        })
    }

  }

activateOrDeactivate(payIn:any,retailerId:any,status:any){
  console.log(payIn+""+retailerId+""+status);
  this.updatePayInDetailsDto.payInDetailsId=payIn;
  this.updatePayInDetailsDto.retailerDetailsId=retailerId;
  this.updatePayInDetailsDto.status=status;
  this.updatePayInDetailsDto.superAdminDetailsId=this.sharedService.getUserDetailId();

this.paymentService.activateOrDeactivatePgStatus(this.updatePayInDetailsDto)
.subscribe((res:CustomResponse)=>{
  if(res.statusCode==='200'){
    this.sharedService.SuccessAlert("PayIn Activated Successfully");
  }else if(res.statusCode==='201'){
      this.sharedService.SuccessAlert("PayIn Deativated  Successfully");
  }
})

}
openWalletLoadModal(distributor: any) {
  this.getPayinPaymentDetailsList();
  this.selectedRetailer = distributor.retailerId;

  const modalEl = document.getElementById('PAYIN');

  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl, {
      backdrop: 'static',   
      keyboard: false       
    });

    modal.show();
  }
}


   getPayinPaymentDetailsList() {
    const pageRequest: PageRequest = {
      pageNumber: this.sharedService.page === 1 ? 1 : this.sharedService.page,
      pageSize: this.sharedService.tableSize,
      id: this.sharedService.getUserDetailId()
    };
    this.paymentService.getAllPaymentGatewayDetails(pageRequest).subscribe((res: CustomResponse) => {
      if (res.statusCode === '200') {
        this.paymentGatewaysList = res.data.list;
        this.sharedService.SuccessAlert("Payment Gateway List Fetched Successfully")
      } else {
        this.sharedService.errorAlert("Payment Gateway List Fetching Failed");
      }
    })


  }

}


