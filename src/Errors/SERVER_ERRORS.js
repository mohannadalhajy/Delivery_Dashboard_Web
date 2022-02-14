const SERVER_ERRORS = [
  {
    code:'1000',
    message:'USER IS ALREADY EXIST',
    messageKey:'USER_IS_ALREADY_EXIST'
  },{
    code:'1001',
    message:'USER NOT REGISTERED',
    messageKey:'USER_NOT_REGISTERED'
  },{
    code:'1002',
    message:'USER IS NOT VERIFY',
    messageKey:'USER_IS_NOT_VERIFY'
  },{
    code:'1003',
    message:'NOT GENERATE CODE',
    messageKey:'NOT_GENERATE_CODE'
  },{
    code:'1004',
    message:'INVALID CODE',
    messageKey:'INVALID_CODE'
  },{
    code:'1005',
    message:'OTP IS EXPIRED',
    messageKey:'OTP_IS_EXPIRED'
  },{
    code:'1006',
    message:'INVALID PASSWORD',
    messageKey:'INVALID_PASSWORD'
  },{
    code:'1007',
    message:'ACCESS TOKEN IS NOT FOUND',
    messageKey:'ACCESS_TOKEN_IS_NOT_FOUND'
  },{
    code:'1008',
    message:'ACCESS TOKEN INVALID',
    messageKey:'ACCESS_TOKEN_INVALID'
  },{
    code:'1009',
    message:'ACCESS TOKEN IS NOT GENERATED',
    messageKey:'ACCESS_TOKEN_IS_NOT_GENERATED'
  },{
    code:'1010',
    message:'ERROR IN HASH PASSWORD',
    messageKey:'ERROR_IN_HASH_PASSWORD'
  },{
    code:'1011',
    message:'ERROR IN COMPARE PASSWORD',
    messageKey:'ERROR_IN_COMPARE_PASSWORD'
  },{
    code:'1012',
    message:'PASSWORD AND CONFIRM PASSWORD NOT CORRECT',
    messageKey:'PASSWORD_AND_CONFIRM_PASSWORD_NOT_CORRECT'
  },{
    code:'1013',
    message:'DO_NOT_SEND_MESSAGE',
    messageKey:'DO_NOT_SEND_MESSAGE'
  },{
    code:'1014',
    message:'OLD PASSWORD IS NOT CORRECT',
    messageKey:'OLD_PASSWORD_IS_NOT_CORRECT'
  },{
    code:'1015',
    message:'ROLE NOT FOUND',
    messageKey:'ROLE_NOT_FOUND'
  },{
    code:'2000',
    message:'USER IS DELETED',
    messageKey:'USER_IS_DELETED'
  },{
    code:'11000',
    message:'INVALID ID',
    messageKey:'INVALID_ID'
  },{
    code:'12000',
    message:'LINK NOT FOUND',
    messageKey:'LINK_NOT_FOUND'
  },{
    code:'3000',
    message:'There are not clients',
    messageKey:'CLIENTS_NOT_FOUND'
  },{
    code:'3001',
    message:'This client not found',
    messageKey:'CLIENT_NOT_FOUND'
  },{
    code:'3002',
    message:'This client is empty',
    messageKey:'CLIENT_EMPTY'
  },{
    code:'3003',
    message:'This company name is empty',
    messageKey:'COMPANY_NAME_EMPTY'
  },{
    code:'3004',
    message:'This user name is empty',
    messageKey:'USER_NAME_EMPTY'
  },{
    code:'3005',
    message:'This company name is exist already',
    messageKey:'COMPANY_IS_EXIST_ALREADY'
  },{
    code:'3006',
    message:'Password is empty',
    messageKey:'PASSWORD_EMPTY'
  },{
    code:'3007',
    message:'Amount is empty',
    messageKey:'POINTS_EMPTY'
  },{
    code:'3008',
    message:'Point is empty',
    messageKey:'PASSWORD_EMPTY'
  },{
    code:'3009',
    message:'Clint name is empty',
    messageKey:'CLIENT_NAME_EMPTY'
  },{
    code:'3010',
    message:'Emirate is empty',
    messageKey:'EMIRATE_EMPTY'
  },{
    code:'3011',
    message:'City is empty',
    messageKey:'CITY_EMPTY'
  },{
    code:'3012',
    message:'Phone is empty',
    messageKey:'PHONE_EMPTY'
  },{
    code:'3013',
    message:'Company type is empty',
    messageKey:'COMPANY_TYPE_EMPTY'
  },{
    code:'3014',
    message:'Contract date is empty',
    messageKey:'CONTRACT_DATE_EMPTY'
  },{
    code:'3015',
    message:'Service start date is empty',
    messageKey:'SERVICE_START_DATE_EMPTY'
  },{
    code:'3016',
    message:'Service end date is empty',
    messageKey:'SERVICE_END_DATE_EMPTY'
  },{
    code:'3018',
    message:'Client is exist already',
    messageKey:'CLIENT_IS_EXIST_ALREADY'
  },{
    code:'3019',
    message:'Client is not valid',
    messageKey:'CLIENT_IS_NOT_VALID'
  },{
    code:'3020',
    message:'Amount is not valid',
    messageKey:'AMOUNT_IS_NOT_VALID'
  },{
    code:'3021',
    message:'Points is not valid',
    messageKey:'POINTS_IS_NOT_VALID'
  },{
    code:'3022',
    message:'Phone is not valid',
    messageKey:'PHONE_NOT_VALID'
  },{
    code:'3024',
    message:'Location X is empty',
    messageKey:'LOCATION_X_EMPTY'
  },{
    code:'3025',
    message:'Location Y is empty',
    messageKey:'LOCATION_Y_EMPTY'
  },{
    code:'3026',
    message:'Location X is not valid',
    messageKey:'LOCATION_X_IS_NOT_VALID'
  },{
    code:'3027',
    message:'Location Y is not valid',
    messageKey:'LOCATION_Y_IS_NOT_VALID'
  },{
    code:'3028',
    message:'Phone is exist already',
    messageKey:'PHONE_IS_EXIST_ALREADY'
  },{
    code:'3029',
    message:'Civil ID is empty',
    messageKey:'CIVIL_ID_EMPTY'
  },{
    code:'3030',
    message:'Civil ID is exist already',
    messageKey:'CIVIL_ID_IS_EXIST_ALREADY'
  },{
    code:'4000',
    message:'There are not drivers',
    messageKey:'DRIVERS_NOT_FOUND'
  },{
    code:'4001',
    message:'This driver is not found',
    messageKey:'DRIVER_NOT_FOUND'
  },{
    code:'4002',
    message:'This driver is empty',
    messageKey:'DRIVER_EMPTY'
  },{
    code:'4003',
    message:'This driver is exist already',
    messageKey:'DRIVER_IS_EXIST_ALREADY'
  },{
    code:'4004',
    message:'This driver is not valid',
    messageKey:'DRIVER_IS_NOT_VALID'
  },{
    code:'5000',
    message:'There are not orders',
    messageKey:'ORDERS_NOT_FOUND'
  },{
    code:'5001',
    message:'This order is not found',
    messageKey:'ORDER_NOT_FOUND'
  },{
    code:'5002',
    message:'This order is empty',
    messageKey:'ORDER_EMPTY'
  },{
    code:'5003',
    message:'This order is exist already',
    messageKey:'ORDER_IS_EXIST_ALREADY'
  },{
    code:'5004',
    message:'This order is not valid',
    messageKey:'ORDER_IS_NOT_VALID'
  },{
    code:'6000',
    message:'There are not vehicles',
    messageKey:'VEHICLES_NOT_FOUND'
  },{
    code:'6001',
    message:'This vehicle is not found',
    messageKey:'VEHICLE_NOT_FOUND'
  },{
    code:'6002',
    message:'This vehicle is empty',
    messageKey:'VEHICLE_EMPTY'
  },{
    code:'6003',
    message:'This vehicle is exist already',
    messageKey:'VEHICLE_IS_EXIST_ALREADY'
  },{
    code:'6004',
    message:'This vehicle is not valid',
    messageKey:'VEHICLE_IS_NOT_VALID'
  }
]
    //---------------------------------------------
    //Authentication Errors Start from 1000 t0 1999
    //---------------------------------------------
    /*const SERVER_ERRORS = {
    //---------------------------------------------
    //Authentication Errors Start from 1000 t0 1999
    //---------------------------------------------
    USER_IS_ALREADY_EXIST: 1000,
  
    USER_NOT_REGISTERED: 1001,
  
    USER_IS_NOT_VERIFY: 1002,
  
    NOT_GENERATE_CODE: 1003,
  
    INVALID_CODE: 1004,
  
    OTP_IS_EXPIRED: 1005,
  
    INVALID_PASSWORD: 1006,
  
    ACCESS_TOKEN_IS_NOT_FOUND: 1007,
  
    ACCESS_TOKEN_INVALID: 1008, // invalid or expired
  
    ACCESS_TOKEN_IS_NOT_GENERATED: 1009,
  
    ERROR_IN_HASH_PASSWORD: 1010,
  
    ERROR_IN_COMPARE_PASSWORD: 1011,
  
    PASSWORD_AND_CONFIRM_PASSWORD_NOT_CORRECT: 1012,
  
    DO_NOT_SEND_MESSAGE: 1013,
  
    OLD_PASSWORD_IS_NOT_CORRECT: 1014,
  
    ROLE_NOT_FOUND: 1015,
  
    USER_NOT_AUTHORIZED: 1016,
    USERS_NOT_FOUND: 1017,
    USER_NOT_FOUND: 1018,
    USER_NOT_FOUND: 1019,
    
    //---------------------------------------------
    // Users Errors Start from 2000 t0 2999
    //---------------------------------------------
    USER_IS_DELETED: 2000,
  
    //---------------------------------------------
    // Clients Errors Start from 3000 t0 3999
    //---------------------------------------------
    CLIENTS_NOT_FOUND: 3000,
    CLIENT_NOT_FOUND: 3001,
    CLIENT_EMPTY: 3002,
    COMPANY_NAME_EMPTY: 3003,
    USER_NAME_EMPTY : 3004,
    CLIENT_NOT_FOUND: 3005,
    PASSWORD_EMPTY: 3006,
    AMOUNT_EMPTY: 3007,
    POINTS_EMPTY: 3008,
    CLIENT_NAME_EMPTY: 3009,
    EMIRATE_EMPTY: 3010,
    CITY_EMPTY: 3011,
    PHONE_EMPTY: 3012,
    COMPANY_TYPE_EMPTY : 3013,
    CONTRACT_DATE_EMPTY: 3014,
    SERVICE_START_DATE_EMPTY: 3015,
    SERVICE_END_DATE_EMPTY: 3016,
    CLIENT_IS_EXIST_ALREADY: 3018,
    CLIENT_IS_NOT_VALID: 3019,
    //---------------------------------------------
    // Users Errors Start from 3000 t0 3999
    //---------------------------------------------
    //---------------------------------------------
    // Invalid Id (Mongodb id)
    INVALID_ID: 11000,
  
    //---------------------------------------------
    //Link does not found
    LINK_NOT_FOUND: 12000,
  };
  
  module.exports = SERVER_ERRORS;
  };*/
  
export default SERVER_ERRORS;
  