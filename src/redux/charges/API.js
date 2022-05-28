const client = require ('../API_Client');
const {CHARGES_API_URL } = require ('../../constants/index');
export const get= ()=>
{
    return client.get(CHARGES_API_URL);
}
export const getByPage= (page, take)=>
{
    return client.get(CHARGES_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return client.getById(CHARGES_API_URL,id);
}
export const post= async(body)=>
{
    const data = client.post(CHARGES_API_URL,body);
    return data;
}
export const patch= async(body, id)=>
{
    const data = client.patch(CHARGES_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = client.deleteItem(CHARGES_API_URL, id);
    return data;
}