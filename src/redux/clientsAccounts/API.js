const client = require ('../API_Client');
const {CLIENTS_ACCOUNTS_API_URL } = require ('../../constants/index');
export const get= ()=>
{
    return client.get(CLIENTS_ACCOUNTS_API_URL);
}
export const getByPage= (page, take)=>
{
    return client.get(CLIENTS_ACCOUNTS_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return client.getById(CLIENTS_ACCOUNTS_API_URL,id);
}
export const post= async(body)=>
{
    const data = client.post(CLIENTS_ACCOUNTS_API_URL,body);
    return data;
}
export const patch= async(body, id)=>
{
    const data = client.patch(CLIENTS_ACCOUNTS_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(CLIENTS_ACCOUNTS_API_URL, id);
    return data;
}