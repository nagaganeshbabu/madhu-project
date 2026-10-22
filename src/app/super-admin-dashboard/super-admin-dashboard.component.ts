import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared.service';
declare const Cashfree: any;

declare var Razorpay: any;
@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html'
})

export class SuperAdminDashboardComponent implements OnInit {

  isLoading!:boolean;
   noData!:boolean;
  chart: any;
  chart1: any;
  chart2: any;
  chart3: any;
showPayuOverlay = false;
    cashfree: any;



  constructor(private titleService: Title, private httpClient: HttpClient, private sharedService: SharedService) {}

  ngOnInit(): void {   
   {
    this.cashfree = Cashfree({
      mode: "sandbox"
    });
}





  }

 payu() {
  this.showPayuOverlay = true;

  const payuWindow = window.open(
    'https://apitest.payu.in/public/#/ddc580da4c9f52c3c903b064b78eebf4a33ff068b04b3fe4bc50e68caceaf3d1',
    '_blank',
    'width=450,height=700'
  );

 
  if (!payuWindow) {
    this.showPayuOverlay = false;
    alert('Popup blocked. Please allow popups and try again.');
    return;
  }

  const timer = setInterval(() => {
    if (payuWindow.closed) {
      clearInterval(timer);
      this.showPayuOverlay = false;
      this.checkPayuStatus();
    }
  }, 800);
}

checkPayuStatus() {
  console.log('Check payment status from backend');
}


pay(){
    this.cashfree.checkout({
      paymentSessionId:"session_brzdqBWD28N0v4w77XjGuVohz2tIAc-hN5vMmxXP0uYGZsNVfS_tlnYtjuSJKDkqhVD3yBaxaqcR-uA8xsukI0d98QV69xT8tmBARG2LanYKVx0_-PLZvrQZpSWUUQpaymentpayment",
      redirectTarget: "_modal"  
    });
}

  
payNow() {
  fetch('http://localhost:8080/api/payments/create-order?amount=1000&currency=INR', {
    method: 'POST'
  })
    .then(res => res.json())
    .then(order => {

      const options = {
        key: 'rzp_test_SAgTrODTCWF5IW',
        amount: order.amount,
        currency: order.currency,
        name: 'YPaymetrix',
        description: 'Test1',
        order_id: order.id,
        handler: (response: any) => {
          alert(
            'Payment Successful\nPayment ID: ' +
            response.razorpay_payment_id
          );
          console.log(response);
        },

        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    })
    .catch(err => console.error(err));
}

}
