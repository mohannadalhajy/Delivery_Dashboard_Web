const client = require ('../API_Client');
const {DELETE_ALL_VEHICLES_API_URL, DELETE_VEHICLES_API_URL, VEHICLES_API_URL, VEHICLES_NUMBERS_API_URL, VEHICLES_BUSY_NUMBERS_API_URL, VEHICLES_FREE_NUMBERS_API_URL} = require ('../../constants/index');
export const get= ()=>
{
    return client.get(VEHICLES_API_URL);
}
export const getByPage= (page, take)=>
{
    return client.get(VEHICLES_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return client.getById(VEHICLES_API_URL,id);
}
export const post= async(body)=>
{
    const data = client.post(VEHICLES_API_URL,body);
    return data;
}
export const patch= async(body, id)=>
{
    const data = client.patch(VEHICLES_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(VEHICLES_API_URL, id);
    return data;
}
export const deleteAll = async()=>
{
    return client.deleteAll(DELETE_ALL_VEHICLES_API_URL);
}
export const deleteGroup = async(body)=>
{
    return client.post(DELETE_VEHICLES_API_URL, body);
}
export const getNumbers= ()=>
{
    return client.get(VEHICLES_NUMBERS_API_URL);
}
export const getBusyNumbers= ()=>
{
    return client.get(VEHICLES_BUSY_NUMBERS_API_URL);
}
export const getFreeNumbers= ()=>
{
    return client.get(VEHICLES_FREE_NUMBERS_API_URL);
}