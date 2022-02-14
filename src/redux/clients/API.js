const client = require ('../API_Client');
const {CLIENTS_API_URL, UPLOAD_IMAGE_CLIENT_API_URL, COMPANIES_NAMES_API_URL, DELETE_ALL_CLIENTS_API_URL, DELETE_CLIENTS_API_URL, CLIENTS_ORDERS_API_URL} = require ('../../constants/index');
//UPLOAD_IMAGE_API_URL, V_CARD_API_URL,EXPORT_EXCEL_API_URL, IMPORT_EXCEL_API_URL,DELETE_CLIENTS_API_URL, SEARCH_CLIENTS_API_URL
export const get= ()=>
{
    return client.get(CLIENTS_API_URL);
}
export const getCompaniesNames= ()=>
{
    return client.get(COMPANIES_NAMES_API_URL);
}
export const getByPage= (page, take)=>
{
    return client.get(CLIENTS_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return client.getById(CLIENTS_API_URL,id);
}
export const getOrders= (id,page, take)=>
{
    return client.getById(CLIENTS_ORDERS_API_URL,id+"?&page="+page+"&take="+take);
}
export const post= async(body)=>
{
    const data = client.post(CLIENTS_API_URL,body);
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
    const data = client.patch(CLIENTS_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(CLIENTS_API_URL, id);
    return data;
}
export const upload_image= async(image)=>
{
    const data = client.post(UPLOAD_IMAGE_CLIENT_API_URL,image);
    return data;
}
export const deleteAll = async()=>
{
    return client.deleteAll(DELETE_ALL_CLIENTS_API_URL);
}
export const deleteGroup = async(body)=>
{
    return client.post(DELETE_CLIENTS_API_URL, body);
}
