export class PayoutConfigDto {
  payId: string;
  payName: string;
  type: string;
  clientId: string;
  clientSecret: string;
  mid: string;
  isp:string;
  superAdminId: string;
  successCallBackUrl!: string;
  failureCallBackUrl!: string;
}
