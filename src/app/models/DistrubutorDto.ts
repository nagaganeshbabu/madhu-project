export class DistrubutorDto{
  distributorDetailId?: string;
  firstName?: string;
  lastName?: string;
  emailId?: string;
  mobileNumber?: string;
  password?: string;
  isTfaEnabled?: string;
  createdBy?: string;
  createdOn?: string;
  modifiedBy?: string | null;
  modifiedOn?: string | null;
  isDeleted?: string;
  isActive?: string;
  isBlocked?: string;
  kycAadharCardDetails?: string | null;
  masterDistributorId!:string;
  kycPanCardDetails?: string | null;
  isKycActivated?: string | null;
confirmPassword?:string |null;
kycAadharCardName?:string;
kycPanCardName?:string;
 percentage?:string;
  type?:string;
}
