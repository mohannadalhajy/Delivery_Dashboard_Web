import SERVER_ERRORS from './SERVER_ERRORS';
const getErrorMessage = (code) => {
    const result = SERVER_ERRORS.find(e => e.code===code+'')   
    if(result === undefined) return "error";
    return result.message;
}
export default getErrorMessage;