import {combineReducers} from 'redux';
import UserReducer from '../redux/User/Reducer';
import ClientsReducer from '../redux/clients/Reducer';
import CustomersReducer from '../redux/customers/Reducer';
import ordersReducer from '../redux/orders/Reducer';
import chargesReducer from '../redux/charges/Reducer';
import driversReducer from '../redux/drivers/Reducer';
import clientsAccountsReducer from '../redux/clientsAccounts/Reducer';
import driversAccountsReducer from '../redux/driversAccounts/Reducer';
import DailyOrderReducer from '../redux/DailyOrders/Reducer';
// import vehiclesReducer from '../redux/vehicles/Reducer';

const allReducers = combineReducers({
   User : UserReducer,
   Clients : ClientsReducer,
   Drivers : driversReducer,
   // Vehicles : vehiclesReducer,
   Orders : ordersReducer,
   DailyOrders : DailyOrderReducer,
   Customers : CustomersReducer,
   Charges: chargesReducer,
   DriversAccounts: driversAccountsReducer,
   ClientsAccounts: clientsAccountsReducer
});
export default allReducers;
 