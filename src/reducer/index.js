import {combineReducers} from 'redux';
import UserReducer from '../redux/User/Reducer';
import ClientsReducer from '../redux/clients/Reducer';
import ordersReducer from '../redux/orders/Reducer';
import driversReducer from '../redux/drivers/Reducer';
import vehiclesReducer from '../redux/vehicles/Reducer';

const allReducers = combineReducers({
   User : UserReducer,
   Clients : ClientsReducer,
   Drivers : driversReducer,
   Vehicles : vehiclesReducer,
   Orders : ordersReducer
});
export default allReducers;
 