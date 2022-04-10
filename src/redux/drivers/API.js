const API = require ('../API_Client');
const {DRIVERS_API_URL, UPLOAD_IMAGE_API_URL, DELETE_ALL_DRIVERS_API_URL, DELETE_DRIVERS_API_URL, DRIVERS_NAMES_API_URL, DRIVERS_FREE_NAMES_API_URL, DRIVERS_BUSY_NAMES_API_URL} = require ('../../constants/index');
export const get= ()=>
{
    return API.get(DRIVERS_API_URL);
}
export const getFreeNames= ()=>
{
    return API.get(DRIVERS_FREE_NAMES_API_URL);
}
export const getBusyNames= ()=>
{
    return API.get(DRIVERS_BUSY_NAMES_API_URL);
}
export const getNames= (id)=>
{
    return API.get(DRIVERS_NAMES_API_URL+(id?("?id="+id):""));
}
export const getByPage= (page, take)=>
{
    return API.get(DRIVERS_API_URL+"?&page="+page+"&take="+take);
}
export const getById= (id)=>
{
    return API.getById(DRIVERS_API_URL,id);
}
export const post= async(body)=>
{
    const data = API.post(DRIVERS_API_URL,body);
    return data;
}
// export const search= async(body)=>
// {
//     const data = API.post(SEARCH_DRIVERS_API_URL+"?&page="+body.page+"&take="+body.take,{search:body.search});
//     return data;
// }
// export const put= async(body, id)=>
// {
//     const data = API.put(DRIVERS_API_URL,body, id);
//     return data;
// }
export const patch= async(body, id)=>
{
    const data = API.patch(DRIVERS_API_URL, body ,id);
    return data;
}
export const deleteItem= async(id)=>
{
    const data = API.deleteItem(DRIVERS_API_URL, id);
    return data;
}
export const upload_image= async(image)=>
{
    const data = API.post(UPLOAD_IMAGE_API_URL,image);
    return data;
}
export const deleteAll = async()=>
{
    return API.deleteAll(DELETE_ALL_DRIVERS_API_URL);
}
export const deleteGroup = async(body)=>
{
    return API.post(DELETE_DRIVERS_API_URL, body);
}
