import { Component, OnInit } from '@angular/core';
import { PayoutConfigDto } from '../models/PayoutConfigDto';
import { PaymentGatewayService } from '../services/payment-gateway.service';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomResponse } from '../models/custom-response';

@Component({
  selector: 'app-save-payment-gateway',
  templateUrl: './save-payment-gateway.component.html',
  styleUrls: ['./save-payment-gateway.component.css']
})
export class SavePaymentGatewayComponent implements OnInit{
  
  payoutConfig: PayoutConfigDto = new PayoutConfigDto();
  isEdit = false;



  payTypes = [
    { id: 'Payin', name: 'Payin' },
    { id: 'Payout', name: 'Payout' }
  ];
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
      const id = params.get('pgid');
      if (id) {
        this.isEdit = true;
        this.titleService.setTitle('Edit Payment Gateway ');
      this.getPaymentDetailsById(id);
      } else {
        this.titleService.setTitle('Create Payment Gateway');
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
 this.paymentGateway.createPaymentGateway(this.payoutConfig).subscribe((res:CustomResponse)=>{
  if(res.statusCode==='200'){
    this.sharedService.SuccessAlert("Payment Gateway Credientails Added Successfully");
  }else if(res.statusCode==='201'){
    this.sharedService.SuccessAlert("Payment Gateway Credientails Updated Successfully");
  }else{
    this.sharedService.errorAlert("Failed to Add Payment Gateway");
  }
     }).add(()=>{
    this.sharedService.hideSpinner();
      this.router.navigate(['/distrubutors-list']);

     })
     }
    }
getPaymentDetailsById(id:any){

  this.paymentGateway.getPaymentGatewayById(id).subscribe((res:CustomResponse)=>{
    if(res.statusCode==='200'){
      this.payoutConfig=res.data;
    }
  })
}

}
