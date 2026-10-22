import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  isSidebarVisible = true;
  constructor(public router: Router,private spinner: NgxSpinnerService) {}


  ngOnInit() {
   
  }



}
