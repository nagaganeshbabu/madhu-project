import { Component, OnInit } from '@angular/core';
import { PageRequest } from '../models/page-request';
import { SharedService } from '../shared.service';
import { RetailerService } from '../services/retailer.service';
import { CustomResponse } from '../models/custom-response';
import { PaymentGatewayService } from '../services/payment-gateway.service';

@Component({
  selector: 'app-payment-gateway-list',
  templateUrl: './payment-gateway-list.component.html',
  styleUrls: ['./payment-gateway-list.component.css']
})
export class PaymentGatewayListComponent implements OnInit {
  paymentGatewaysList: any[] = [];
  role!: string;
  id!: any;
  ngOnInit() {
    this.getPayinPaymentDetailsList();
  }

  constructor(public sharedService: SharedService, private paymentService: PaymentGatewayService) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.id = currentUser?.role;
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

  block(id: any) {
    if (id != null && id != null) {
      console.log(id);

      this.paymentService.activateorDeactivare(id)
        .subscribe((res: CustomResponse) => {
          if (res.statusCode === '201') {
            this.sharedService.SuccessAlert("Block Status Changed");
          } else {
            this.sharedService.errorAlert("Block Status Failed");
          } setTimeout(() => {
     this.getPayinPaymentDetailsList();
    }, 1500);
        })
    }
  }


  onTableDataChange(event: number): void {
    this.sharedService.page = event;
    this.getPayinPaymentDetailsList();
  }

}


