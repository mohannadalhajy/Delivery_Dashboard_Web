import { DRIVERS_WITH_VEHICLES_API_URL, DRIVER_VEHICLES_API_URL, RELEASE_DRIVER_API_URL, RELEASE_VEHICLE_API_URL, VEHICLES_TRANSACTIONS_API_URL, VEHICLES_WITH_DRIVERS_API_URL } from '../../constants';

const API = require ('../API_Client');
export const getDrivers= (page, take)=>
{
    return API.get(DRIVERS_WITH_VEHICLES_API_URL+"?&page="+page+"&take="+take);
}
export const getVehicles= (page, take)=>
{
    return API.get(VEHICLES_WITH_DRIVERS_API_URL+"?&page="+page+"&take="+take);
}
export const getTransactions= (page, take)=>
{
    return API.get(VEHICLES_TRANSACTIONS_API_URL+"?&page="+page+"&take="+take);
}
export const add= async(body)=>
{
    const data = API.post(DRIVER_VEHICLES_API_URL,body);
    return data;
}
export const releaseDriver= (id)=>
{
    return API.getById(RELEASE_DRIVER_API_URL,id);
}
export const releaseVehicle= (id)=>
{
    return API.getById(RELEASE_VEHICLE_API_URL,id);
}