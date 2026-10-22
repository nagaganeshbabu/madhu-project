import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { PaymentGatewayService } from '../services/payment-gateway.service';
import { CustomResponse } from '../models/custom-response';
import { PayinCommericalsDto } from '../models/payin-commericals-dto';
import { PayinCommericalServiceService } from '../services/payin-commerical-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-commerical-api',
  templateUrl: './commerical-api.component.html',
  styleUrls: ['./commerical-api.component.css']
})
export class CommericalApiComponent {
  private routeParamSub: any;
  isEdit = false;
  paymentGatewaysList: any = [];
  commericalsDto: PayinCommericalsDto = new PayinCommericalsDto();
  txType= ['Flat','Percentage']
  paymentList = ['Debit Card',
     'Rupay Debit Card',
     'Credit Card (Visa & Rupay)',
     'Credit Card (Master) ',
    'Credit Card Amex',
    'International Credit & Debit Card', 
    'Net Banking HDFC & ICICI',
    'Axis, Kotak & Yes NB',
    'SBI NB',
'Corporates Cards',
    'UPI'];
  constructor(public sharedService: SharedService,
    public paymentGatewayService: PaymentGatewayService,
    public payinCommericalsService: PayinCommericalServiceService,
    public router: Router,
    private route: ActivatedRoute,
    private titleService: Title) {
    this.getAllPaymentGateways();
    this.routeParamSub = this.route.paramMap.subscribe(params => {
      const id = params.get('payinId');
      if (id) {
        this.isEdit = true;
        this.titleService.setTitle('Edit  PayIn Commericals');
        this.getCommericalsPayInById(id);
      } else {
        this.titleService.setTitle('Create  PayIn Commericals');
      }
    });
  }


  onSubmit(commericalsForm: any) {
    this.commericalsDto.superAdminDetailsId = this.sharedService.getUserDetailId();
    this.sharedService.showSpinner();
    this.payinCommericalsService.savePayInCommericals(this.commericalsDto).subscribe((res: CustomResponse) => {
      if (res != null && res.statusCode === '200') {
        this.sharedService.SuccessAlert("Payin Commericals Created Successfully");
      } else if (res !== null && res.statusCode === '201') {
        this.sharedService.SuccessAlert("Payin Commericals Updated Successfully");
      } else {
        this.sharedService.SuccessAlert("Payin Commericals Error Successfully");
      }
      this.router.navigate(['/commericals-payin-list']);
    }).add(() => {
      this.sharedService.hideSpinner();
    })
  }

  getAllPaymentGateways() {
    this.paymentGatewayService.getAllActivePaymentGatewaysList().subscribe((res: CustomResponse) => {
      if (res != null && res.statusCode === '200') {
        this.paymentGatewaysList = res.data;
      } else {
        this.sharedService.errorAlert(res.data);
      }
    })
  }


  getCommericalsPayInById(id: any) {
    this.sharedService.showSpinner();
    this.payinCommericalsService.getPayInDetailsById(id).subscribe((res: CustomResponse) => {
      if (res != null && res.statusCode === '200') {
        this.commericalsDto = res.data;
        this.sharedService.SuccessAlert("Commericals Details Fetched Successfully");
      } else {
        this.sharedService.errorAlert(res.data);
      }
    }).add(()=>{
      this.sharedService.hideSpinner();
    })
  }

}
