import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterDistrubutor } from '../models/master-distrubutor';
import { SharedService } from '../shared.service';
import { MasterDistrubutorService } from '../services/master-distrubutor.service';
import { CustomResponse } from '../models/custom-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-master-distrubutor',
  templateUrl: './create-master-distrubutor.component.html',
  styleUrls: ['./create-master-distrubutor.component.css']
})
export class CreateMasterDistrubutorComponent implements OnInit, OnDestroy {

  masterDistrubutorDto: MasterDistrubutor = new MasterDistrubutor();
  isEdit = false;
  fileName: string = '';
  fileName2: string = '';

  private routeParamSub: any;

  constructor(
    private masterDistrubutor: MasterDistrubutorService,
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
      const id = params.get('mid');
      if (id) {
        this.isEdit = true;
        this.titleService.setTitle('Edit Master Distributor');
        this.getMasterDistrubutorsById(id);
      } else {
        this.titleService.setTitle('Create Master Distributor');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
  }

  /** Fetch data by ID for editing **/
  getMasterDistrubutorsById(id: string) {
    this.sharedService.showSpinner();
    this.masterDistrubutor.getMasterDistrubutorById(id).subscribe({
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

  submit(msdto: MasterDistrubutor) {
    this.masterDistrubutorDto.superAdminId = this.sharedService.getUserDetailId();
    this.sharedService.showSpinner();
    this.masterDistrubutor.createMasterDistrubutor(this.masterDistrubutorDto)
      .subscribe({
        next: (res: CustomResponse) => {
          if (res.statusCode === '200') {
            this.sharedService.SuccessAlert('Master Distributor successfully created');
          } else if (res.statusCode === '201') {
            this.sharedService.SuccessAlert('Master Distributor successfully updated');
          } else {
            this.sharedService.errorAlert('Saving or update failed');
          }
          this.router.navigate(['/master-distrubutors']);
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
