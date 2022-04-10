const client = require ('../API_Client');
const { CUSTOMERS_API_URL, UPLOAD_IMAGE_CUSTOMER_API_URL, DELETE_ALL_CUSTOMERS_API_URL, DELETE_CUSTOMERS_API_URL, CUSTOMERS_NAMES_API_URL} = require ('../../constants/index');
//UPLOAD_IMAGE_API_URL, V_CARD_API_URL,EXPORT_EXCEL_API_URL, IMPORT_EXCEL_API_URL,DELETE_CLIENTS_API_URL, SEARCH_CLIENTS_API_URL
export const get= ()=>
{
    return client.get(CUSTOMERS_API_URL);
}
export const getNames= (clientId)=>
{
    return client.get(CUSTOMERS_NAMES_API_URL+"/"+clientId);
}
export const getByPage= (page, take)=>
{
    return client.get(CUSTOMERS_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return client.getById(CUSTOMERS_API_URL,id);
}
export const getOrders= (id,page, take)=>
{
    return client.getById(CUSTOMERS_API_URL,id+"?&page="+page+"&take="+take);
}
export const post= async(body)=>
{
    const data = client.post(CUSTOMERS_API_URL,body);
    return data;
}
// export const search= async(body)=>
// {
//     const data = client.post(SEARCH_CLIENTS_API_URL+"?&page="+body.page+"&take="+body.take,{search:body.search});
//     return data;
// }
// export const put= async(body, id)=>
// {
//     const data = client.put(CLIENTS_API_URL,body, id);
//     return data;
// }
export const patch= async(body, id)=>
{
    const data = client.patch(CUSTOMERS_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(CUSTOMERS_API_URL, id);
    return data;
}
export const upload_image= async(image)=>
{
    const data = client.post(UPLOAD_IMAGE_CUSTOMER_API_URL,image);
    return data;
}
export const deleteAll = async()=>
{
    return client.deleteAll(DELETE_ALL_CUSTOMERS_API_URL);
}
export const deleteGroup = async(body)=>
{
    return client.post(DELETE_CUSTOMERS_API_URL, body);
}
