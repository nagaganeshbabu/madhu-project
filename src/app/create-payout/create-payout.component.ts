import { Component, OnInit } from '@angular/core';
import { PayoutConfigDto } from '../models/PayoutConfigDto';
import { PaymentGatewayService } from '../services/payment-gateway.service';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomResponse } from '../models/custom-response';

@Component({
  selector: 'app-create-payout',
  templateUrl: './create-payout.component.html',
  styleUrls: ['./create-payout.component.css']
})
export class CreatePayoutComponent implements OnInit{
  
  payoutConfig: PayoutConfigDto = new PayoutConfigDto();
  isEdit = false;
  private routeParamSub: any;

   constructor(
        private paymentGateway: PaymentGatewayService,
        private titleService: Title,
        private sharedService: SharedService,
        private router: Router,
        private route: ActivatedRoute
      ) {}
    
ngOnInit(): void {
    this.routeParamSub = this.route.paramMap.subscribe(params => {
      const id = params.get('payoutId');
      if (id) {
        this.isEdit = true;
        this.titleService.setTitle('Edit Payout  ');
      this.getPaymentDetailsById(id);
      } else {
        this.titleService.setTitle('Create Payout');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.sharedService.showSpinner();
    this.payoutConfig.superAdminId=this.sharedService.getUserDetailId();
 this.paymentGateway.createPayoutPaymentGateway(this.payoutConfig).subscribe((res:CustomResponse)=>{
  if(res.statusCode==='200'){
    this.sharedService.SuccessAlert("Payment Gateway Credientails Added Successfully");
  }else if(res.statusCode==='201'){
    this.sharedService.SuccessAlert("Payment Gateway Credientails Updated Successfully");
  }else{
    this.sharedService.errorAlert("Failed to Add Payment Gateway");
  }
     }).add(()=>{
    this.sharedService.hideSpinner();
      this.router.navigate(['/payment-payout-gateways-list']);

     })
     }
    }

getPaymentDetailsById(id:any){
  this.paymentGateway.getPaymentPayoutGatewayById(id).subscribe((res:CustomResponse)=>{
    if(res.statusCode==='200'){
      this.payoutConfig=res.data;
    }else{
        this.sharedService.errorAlert(res.data);
    }
  })
}


}
