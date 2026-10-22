import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentGatewayService } from './services/payment-gateway.service';
import { SharedService } from './shared.service';
import { CustomResponse } from './models/custom-response';
import { PayinCommericalServiceService } from './services/payin-commerical-service.service';
declare const Cashfree: any;

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LMS';
  @ViewChild('walletModal') walletModal: ElementRef;

 paymentGatewaysList: any = [];
  responseMap :any;
 payInTranscationDto:any={};
 paymentModes:any=[];
    cashfree: any;  
 constructor(public sharedService: SharedService,
    public paymentGatewayService: PaymentGatewayService,
  public payinService:PayinCommericalServiceService) {
       this.getAllPaymentGateways();//
       this.getAllPaymentModes();
    }

    ngOnInit(): void {
      this.cashfree = Cashfree({
      mode: "sandbox"
    });
    }





onSubmit(a:any){
$('#WalletLoadModal').modal('hide');
this.sharedService.showSpinner();
this.payInTranscationDto.retailerId="RD-10000";
  this.payinService.payInTxDetails(this.payInTranscationDto).subscribe((res: CustomResponse) => {
        if (res != null && res.statusCode === '200') {
           this.responseMap = res.data;    
          if (this.responseMap.cashfree  === 'cashfree') {
               this.cashfree.checkout({
               paymentSessionId:this.responseMap.link,
               redirectTarget: "_modal"  
             });
           }
        } else {
          this.sharedService.errorAlert(res.data);
        }
      }).add(()=>{
        $('.modal').modal('hide');
        this.sharedService.hideSpinner();
      })




  


  }


  resetForm(form: any) {
  form.resetForm();   // IMPORTANT → use resetForm(), not reset()
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

getAllPaymentModes(){
  this.payinService.getPaymentModes().subscribe((res: CustomResponse) => {
        if (res != null && res.statusCode === '200') {
          this.paymentModes = res.data;
        } else {
          this.sharedService.errorAlert(res.data);
        }
      })
}

}
