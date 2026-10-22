import { Component } from '@angular/core';
import { MasterDistrubutor } from '../models/master-distrubutor';
import { MasterDistrubutorService } from '../services/master-distrubutor.service';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomResponse } from '../models/custom-response';
import { DistrubutorDto } from '../models/DistrubutorDto';
import { DistrubutorService } from '../services/distrubutor.service';

@Component({
  selector: 'app-create-distrubutor',
  templateUrl: './create-distrubutor.component.html',
  styleUrls: ['./create-distrubutor.component.css']
})
export class CreateDistrubutorComponent {
 distrubutorDto: DistrubutorDto = new DistrubutorDto();
  isEdit = false;
  fileName: string = '';
  fileName2: string = '';

  private routeParamSub: any;

   tfaList = [
    { id: '1', name: 'C2C' },
    { id: '2', name: 'BBPS' }
  ];


  constructor(
    private distrubutorService: DistrubutorService,
    private titleService: Title,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeParamSub = this.route.paramMap.subscribe(params => {
      const id = params.get('did');
      if (id) {
        this.isEdit = true;
        this.titleService.setTitle('Edit  Distributor');
        this.getMasterDistrubutorsById(id);
      } else {
        this.titleService.setTitle('Create  Distributor');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
  }

  getMasterDistrubutorsById(id: string) {
    this.sharedService.showSpinner();
    this.distrubutorService.getDistrubutorById(id).subscribe({
      next: (res: CustomResponse) => {
        if (res && res.statusCode === '200') {
          this.distrubutorDto = res.data;
          this.fileName = this.distrubutorDto.kycAadharCardName;
          this.fileName2 = this.distrubutorDto.kycPanCardName;
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
    this.sharedService.showSpinner();
    this.distrubutorDto.masterDistributorId=this.sharedService.getUserDetailId();
    this.distrubutorService.createDistrubutor(this.distrubutorDto)
      .subscribe({
        next: (res: CustomResponse) => {
          if (res.statusCode === '200') {
            this.sharedService.SuccessAlert('Distributor successfully created');
          } else if (res.statusCode === '201') {
            this.sharedService.SuccessAlert('Distributor successfully updated');
          } else {
            this.sharedService.errorAlert('Saving or update failed');
          }
          this.router.navigate(['/distrubutors-list']);
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
        this.distrubutorDto.kycAadharCardDetails = reader.result as string;
        this.distrubutorDto.kycAadharCardName=file.name;
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
        this.distrubutorDto.kycPanCardDetails = reader.result as string;
        this.distrubutorDto.kycPanCardName=file.name;
      };
      reader.readAsDataURL(file);
    }
  }
}
