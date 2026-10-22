import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomResponse } from '../models/custom-response';
import { RetailerService } from '../services/retailer.service';

@Component({
  selector: 'app-create-retailer',
  templateUrl: './create-retailer.component.html',
  styleUrls: ['./create-retailer.component.css']
})
export class CreateRetailerComponent implements OnInit{

  masterDistrubutorDto:any={};
  isEdit = false;
  fileName: string = '';
  fileName2: string = '';
  mdId!:any;

  private routeParamSub: any;
  
  constructor(
    private retailerService: RetailerService,
    private titleService: Title,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  tfaList = [
    { id: '1', name: 'C2C' },
    { id: '2', name: 'BBPS' }
  ];

  ngOnInit(): void {
    this.routeParamSub = this.route.paramMap.subscribe(params => {
      const id = params.get('rid');
      if (id) {
        this.isEdit = true;
        this.titleService.setTitle('Edit Retailer');
       this.getRetailerDetails(id);
      } else {
        this.titleService.setTitle('Create Retailer');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
  }

  getRetailerDetails(id:any){
this.sharedService.showSpinner();
    this.retailerService.getRetailerId(id).subscribe({
      next: (res: CustomResponse) => {
        if (res && res.statusCode === '200') {
          this.masterDistrubutorDto = res.data;
          this.fileName = this.masterDistrubutorDto.kycAadharCardName;
          this.fileName2 = this.masterDistrubutorDto.kycPanCardName;
        } else {
          this.sharedService.errorAlert('Failed to fetch details');
        }
      },
      error: () => {
        this.sharedService.errorAlert('Error fetching Master Distributor');
      },
      complete: () => {
        this.sharedService.hideSpinner();
      }
    });


  }

  submit(msdto: any) {
    if (this.masterDistrubutorDto.isUnderMasterDistrubutor==='y'){
     this.masterDistrubutorDto.masterDistrubutorId=this.sharedService.getUserDetailId();
    }else{
      this.masterDistrubutorDto.distrubutorId=this.sharedService.getUserDetailId();
    }
    this.sharedService.showSpinner();
    this.retailerService.createRetailer(this.masterDistrubutorDto)
      .subscribe({
        next: (res: CustomResponse) => {
          if (res.statusCode === '200') {
            this.sharedService.SuccessAlert('Retailer successfully created');
          } else if (res.statusCode === '201') {
            this.sharedService.SuccessAlert('Retailer successfully updated');
          } else {
            this.sharedService.errorAlert('Saving or update failed');
          }
          this.router.navigate(['/retailers-list']);
        },
        error: () => {
          this.sharedService.errorAlert('Something went wrong while saving');
        },
        complete: () => {
          this.sharedService.hideSpinner();
        }
      }).add(()=>{
        this.fileName=null;
        this.fileName2=null;
      })
  }

  /** Aadhaar File Upload **/
  onAadharChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.masterDistrubutorDto.kycAadharCardDetails = reader.result as string;
        this.masterDistrubutorDto.kycAadharCardName=file.name;
      };
      reader.readAsDataURL(file);
    }
  }

  /** PAN File Upload **/
  onPanChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.masterDistrubutorDto.kycPanCardDetails = reader.result as string;
        this.masterDistrubutorDto.kycPanCardName=file.name;
      };
      reader.readAsDataURL(file);
    }
  }
}
