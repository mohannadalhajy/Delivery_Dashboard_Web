const API = require ('../API_Client');
const {DRIVERS_ACCOUNTS_API_URL } = require ('../../constants/index');
export const get= ()=>
{
    return API.get(DRIVERS_ACCOUNTS_API_URL);
}
export const getByPage= (page, take)=>
{
    return API.get(DRIVERS_ACCOUNTS_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return API.getById(DRIVERS_ACCOUNTS_API_URL,id);
}
export const post= async(body)=>
{
    const data = API.post(DRIVERS_ACCOUNTS_API_URL,body);
    return data;
}
export const patch= async(body, id)=>
{
    const data = API.patch(DRIVERS_ACCOUNTS_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = API.deleteItem(DRIVERS_ACCOUNTS_API_URL, id);
    return data;
}