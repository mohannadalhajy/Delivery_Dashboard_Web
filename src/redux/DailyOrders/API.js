const client = require ('../API_Client');
const {ORDERS_API_URL, DELETE_ALL_ORDERS_API_URL, DELETE_ORDERS_API_URL, EDIT_ORDER_DRIVER_API_URL, DAILY_ORDERS_API_URL } = require ('../../constants/index');
export const get= ()=>
{
    return client.get(DAILY_ORDERS_API_URL);
}
export const getByPage= (page, take, type)=>
{
    return client.get(ORDERS_API_URL+"?&page="+page+"&take="+take+(type?("&type="+type):""));
}
export const getById= (id)=>
{
    return client.getById(ORDERS_API_URL,id);
}
export const post= async(body)=>
{
    const data = client.post(ORDERS_API_URL,body);
    return data;
}
export const patch= async(body, id)=>
{
    const data = client.patch(ORDERS_API_URL, body ,id);
    return data;
}
export const patchDriver= async(body, id)=>
{
    const data = client.patch(EDIT_ORDER_DRIVER_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(ORDERS_API_URL, id);
    return data;
}
export const deleteAll = async()=>
{
    return client.deleteAll(DELETE_ALL_ORDERS_API_URL);
}
export const deleteGroup = async(body)=>
{
    return client.post(DELETE_ORDERS_API_URL, body);
}