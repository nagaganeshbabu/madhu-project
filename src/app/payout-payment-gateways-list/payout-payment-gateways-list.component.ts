import { Component, OnInit } from '@angular/core';
import { PageRequest } from '../models/page-request';
import { SharedService } from '../shared.service';
import { CustomResponse } from '../models/custom-response';
import { PaymentGatewayService } from '../services/payment-gateway.service';


@Component({
  selector: 'app-payout-payment-gateways-list',
  templateUrl: './payout-payment-gateways-list.component.html',
  styleUrls: ['./payout-payment-gateways-list.component.css']
})
export class PayoutPaymentGatewaysListComponent implements OnInit {
  paymentGatewaysList: any[] = [];
  role!: string;
  id!: any;
  ngOnInit() {
    this.getAllPayoutGatewayDetails();
  }

  constructor(public sharedService: SharedService, private paymentService: PaymentGatewayService) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.id = currentUser?.role;
  }


  getAllPayoutGatewayDetails() {
    const pageRequest: PageRequest = {
      pageNumber: this.sharedService.page === 1 ? 1 : this.sharedService.page,
      pageSize: this.sharedService.tableSize,
      id: this.sharedService.getUserDetailId()
    };
    this.paymentService.getAllPayoutGatewayDetails(pageRequest).subscribe((res: CustomResponse) => {
      if (res.statusCode === '200') {
        this.paymentGatewaysList = res.data.list;
        this.sharedService.SuccessAlert("Payment Gateway List Fetched Successfully")
      } else {
        this.sharedService.errorAlert("Payment Gateway List Fetching Failed");
      }
    })


  }

  block(id: any) {
    if (id != null && id != null) {
      this.paymentService.activateOrDeactivatePayoutStatus(id)
        .subscribe((res: CustomResponse) => {
          if (res.statusCode === '201') {
            this.sharedService.SuccessAlert("Block Status Changed");
          } else {
            this.sharedService.errorAlert("Block Status Failed");
          } setTimeout(() => {
     this.getAllPayoutGatewayDetails();
    }, 1500);
        })
    }
  }


  onTableDataChange(event: number): void {
    this.sharedService.page = event;
    this.getAllPayoutGatewayDetails();
  }

}


