export const BASEURL = 'http://localhost:3002';
//export const BASEURL = 'http://node-express-env.eba-vrmbrr9p.us-east-2.elasticbeanstalk.com';
const PREFIX = '/dashboard' 
///Auth
export const AUTH_API_URL = BASEURL+'/auth';
export const LOGIN_API_URL = AUTH_API_URL + '/login';
export const LOGOUT_API_URL = AUTH_API_URL+'/logout';

///Profile
export const PROFILE_API_URL = BASEURL+'/profile';
export const PROFILE_ME_API_URL = PROFILE_API_URL+'/profileMe';
export const UPDATE_PASSWORD_API_URL = PROFILE_API_URL+'/updatePassword';
export const UPDATE_EMAIL_API_URL = PROFILE_API_URL+'/updateEmail';
////Client
export const CLIENTS_API_URL = BASEURL+'/clients'
export const DELETE_ALL_CLIENTS_API_URL = CLIENTS_API_URL+'/deleteAll';
export const DELETE_CLIENTS_API_URL = CLIENTS_API_URL+'/deleteGroup';
export const CLIENTS_ORDERS_API_URL = CLIENTS_API_URL+'/orders';
export const UPLOAD_IMAGE_CLIENT_API_URL = CLIENTS_API_URL+'/uploadImage';
export const COMPANIES_NAMES_API_URL = CLIENTS_API_URL+'/companiesNames';
export const IMAGES_CLIENTS_API_URL = BASEURL+'/clientsImages';
export const IMAGES_DRIVERS_API_URL = BASEURL+'/driversImages';
export const DOWNLOAD_EXCEL_API_URL = BASEURL+'/excel';
export const DOWNLOAD_ERRORS_API_URL = BASEURL+'/errors';
////Orders
export const ORDERS_API_URL = BASEURL+'/orders'
export const DELETE_ALL_ORDERS_API_URL = ORDERS_API_URL+'/deleteAll';
export const DELETE_ORDERS_API_URL = ORDERS_API_URL+'/deleteGroup';
////Drivers
export const DRIVERS_API_URL = BASEURL+'/drivers'
export const DELETE_ALL_DRIVERS_API_URL = DRIVERS_API_URL+'/deleteAll';
export const DRIVERS_NAMES_API_URL = DRIVERS_API_URL+'/names';
export const DRIVERS_FREE_NAMES_API_URL = DRIVERS_API_URL+'/freeNames';
export const DRIVERS_BUSY_NAMES_API_URL = DRIVERS_API_URL+'/busyNames';
export const DELETE_DRIVERS_API_URL = DRIVERS_API_URL+'/deleteGroup';
export const UPLOAD_IMAGE_DRIVER_API_URL = DRIVERS_API_URL+'/uploadImage';
////Vehicles
export const VEHICLES_API_URL = BASEURL+'/vehicles'
export const VEHICLES_BUSY_NUMBERS_API_URL = VEHICLES_API_URL+'/busyNumbers';
export const VEHICLES_FREE_NUMBERS_API_URL = VEHICLES_API_URL+'/freeNumbers';
export const VEHICLES_NUMBERS_API_URL = VEHICLES_API_URL+'/numbers';
export const DELETE_ALL_VEHICLES_API_URL = VEHICLES_API_URL+'/deleteAll';
export const DELETE_VEHICLES_API_URL = VEHICLES_API_URL+'/deleteGroup';
////driver vehicle
export const DRIVER_VEHICLES_API_URL = BASEURL+'/driverVehicles'
export const RELEASE_DRIVER_API_URL = DRIVER_VEHICLES_API_URL+'/releaseDriver';
export const RELEASE_VEHICLE_API_URL = DRIVER_VEHICLES_API_URL+'/releaseVehicle';
export const DRIVERS_WITH_VEHICLES_API_URL = DRIVER_VEHICLES_API_URL+'/drivers';
export const VEHICLES_WITH_DRIVERS_API_URL = DRIVER_VEHICLES_API_URL+'/vehicles';
export const VEHICLES_TRANSACTIONS_API_URL = DRIVER_VEHICLES_API_URL+'/transactions';

////clients route
export const PREFIX_ROUTE = PREFIX;
export const CLIENTS_ROUTE = PREFIX + '/clients';
export const CLIENT_DETAILS_ROUTE = PREFIX + '/clientDetails';
export const CLIENT_ORDERS_ROUTE = PREFIX + '/clientOrders';
export const EDIT_CLIENT_ROUTE = PREFIX + '/editClient';
export const ADD_CLIENT_ROUTE = PREFIX + '/addClient';
////orders route
export const ORDERS_ROUTE = PREFIX + '/orders';
export const ORDER_DETAILS_ROUTE = PREFIX + '/orderDetails';
export const EDIT_ORDER_ROUTE = PREFIX + '/editOrder';
export const ADD_ORDER_ROUTE = PREFIX + '/addOrder';
////drivers route
export const DRIVERS_ROUTE = PREFIX + '/drivers';
export const DRIVER_DETAILS_ROUTE = PREFIX + '/driverDetails';
export const EDIT_DRIVER_ROUTE = PREFIX + '/editDrivers';
export const ADD_DRIVER_ROUTE = PREFIX + '/addDriver';
////vehicles route
export const VEHICLES_ROUTE = PREFIX + '/vehicles';
export const VEHICLE_DETAILS_ROUTE = PREFIX + '/vehicleDetails';
export const EDIT_VEHICLE_ROUTE = PREFIX + '/editVehicle';
export const ADD_VEHICLE_ROUTE = PREFIX + '/addVehicle';

/////drivers vehicles route
export const ADD_DRIVER_VEHICLE_ROUTE = PREFIX + '/addDriverVehicle'
export const RELEASE_VEHICLE_ROUTE = PREFIX + '/releaseVehicle'
export const RELEASE_DRIVER_ROUTE = PREFIX + '/releaseDriver'
export const VEHICLES_DRIVERS_ROUTE = PREFIX + '/vehiclesDrivers'
export const DRIVERS_VEHICLES_ROUTE = PREFIX + '/driversVehicles'
export const VEHICLES_TRANSACTIONS_ROUTE = PREFIX + '/vehiclesTransactions'

///auth route
export const RESET_PASSWORD_ROUTE = PREFIX + '/resetPass';
export const RESET_EMAIL_ROUTE = PREFIX + '/resetEmail';
export const LOGIN_ROUTE = PREFIX + '/login';
export const PROFILE_ROUTE = PREFIX + '/profile';
export const ADD_USER_ROUTE = PREFIX + '/addUser';
export const EDIT_USER_ROUTE = PREFIX + '/editUser';
//Dashboard route
export const DASHBOARD_ROUTE = PREFIX + '/dashboard'
////Cities
export const EMIRATES = ["AD", "AJM", "FUJ", "SHJ", "DUBAI", "RAK", "UAQ", "AIN","WEST"]
export const ORDER_EMIRATES = ["AJM", "SHJ", "DUBAI", "UAQ"]
export const ORDER_TYPES = ["Internal","External","LPO"]
export const TRANSPORT_TYPES = ["Motor","Car"]
export const VEHICLES_SERVICE_TYPES = ["Owning","Rent"]
export const VISA_TYPES = ["Visit", "Resident", "Loan"]
export const DRIVER_STATUS = ["Busy", "Available", "Unavailable"]
export const SHIFT_TYPES = ["Morning", "Evening", "Night"]
export const ORDER_STATUS_TYPES = ["Waiting list", "Canceled","On progress", "Waiting driver", "In progress", "Deliverd", "Failed"]