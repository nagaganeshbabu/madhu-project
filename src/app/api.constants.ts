export const API_CONSTANTS = {
    //login api end points
    REGISTER_ENDPOINT: '/authenticate/register',
    LOGIN_ENDPOINT: '/authenticate/login',
    TOKEN_END_POINT: '/authenticate/get_token',
    CHECK_EMAIL_EXISTS: '/authenticate/check_user_email_exists',
    FORGOT_PASSWORD: '/authenticate/forgot-password',

    
    //SUPER-ADMIN CONTROLLER END POINTS 
    CREATE_SUPER_ADMIN:'/super-admin-api/saveSuperAdminDetails',
    GET_ALL_SUPER_ADMINS:'/super-admin-api/getAllSuperAdmins',
    GET_SUPER_ADMIN_BY_ID:'/super-admin-api/getSuperAdminById',

    //Master Distrubutors End Points 
    GET_MASTER_DISTRUBUTORS_LIST:'/master-api/getAllMasterDistributorDetails',
    SAVE_MASTER_DISTRUBUTORS:'/master-api/saveMasterDistributorDetails',
    GET_MASTER_DISTRUBUTORS_ID:'/master-api/getMasterDistrubutorDetailsById',
    BLOCK_MASTER_DISTRUBUTORS:'/master-api/blockRoleDetailsById',

    //Distrubutors END points 
    GET_DISTRUBUTORS_LIST:"/distrubutor-api/getAllDistrubutorDetailsList",
    SAVE_DISTRUBUTORS:"/distrubutor-api/saveDistributorDetails",
     GET_DISTRUBUTORS_ID:'/distrubutor-api/getDistrubutorDetailsById',

     //Retailers End Points
     GET_RETAILERS_LIST:"/retailer-api/getAllRetailersList",
     SAVE_RETAILER:"/retailer-api/saveRetailerDetails",
     GET_RETAILER_ID:"/retailer-api/getRetailerDetailsById",

     //payment gateway  payin end points 
     SAVE_PAYMENT_GATEWAY:"/payin-api/savePayinDetails",
     GET_ALL_PAYMENT_DETAILS:"/payin-api/getAllPaymentDetails",
     GET_PAYMENT_OUT_ID:"/payin-api/getPayinDetailsById",
     ACTIVATE_OR_DEACTIVATE:"/payin-api/activateOrDeactivatePaymentGateway",
     GET_ALL_ACTIVE_PAYINS:"/payin-api/getAllActivePayIns",
     ACTIVATE_OR_DEACTIVATE_PAYIN_PGS:"/payin-api/enableOrDisablePayInPgByRetailerId",
     

     //PAYIN_COMMERICALS
     SAVE_PAYIN_COMMERICALS:"/payin-commericals-api/savePayInCommericals",
     GET_ALL_PAYIN_COMMERICALS:"/payin-commericals-api/getAllPayInCommericals",                   
     GET_PAYIN_DETAILS_BY_ID:"/payin-commericals-api/getPayInCommericalsById",

    //payment gateway payout end points
     SAVE_PAYOUT_GATEWAY:"/payout-gateway-api/savePayoutGatewayDetails",
     GET_ALL_PAYOUT_LIST:"/payout-gateway-api/getAllPayoutDetailsList",
    GET_PAYOUT_DETAILS_BY_ID :"/payout-gateway-api/getPayoutDetailsById",
    ACTIVATE_OR_INACTIVATE:"/payout-gateway-api/activateOrDeactivatePayoutGateway",
    GET_ALL_PAYMENT_MODES:'/payin-commericals-api/getAllPaymentModes',

    //transcations 
    SAVE_PAYIN_TRN:"/transcations/payInTranscation",
    



};
