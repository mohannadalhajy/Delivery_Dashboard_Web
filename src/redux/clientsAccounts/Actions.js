import {
    FETCH_GET_ALL_CLIENTS_ACCOUNTS_REQUEST,
    FETCH_GET_ALL_CLIENTS_ACCOUNTS_SUCCESS,
    FETCH_GET_ALL_CLIENTS_ACCOUNTS_FAILURE,
    FETCH_ADD_CLIENT_ACCOUNT_FAILURE,
    FETCH_ADD_CLIENT_ACCOUNT,
    FETCH_EDIT_CLIENT_ACCOUNT,
    FETCH_INIT_EDIT_CLIENT_ACCOUNT,
    FETCH_DELETE_ALL_CLIENTS_ACCOUNTS_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const API = require ('./API');

export const getClientsAccountsRequestAction = () => {
    return {
      type: FETCH_GET_ALL_CLIENTS_ACCOUNTS_REQUEST,
    };
};

export const getClientsAccountsSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_CLIENTS_ACCOUNTS_SUCCESS,
    payload: result,
};
};

export const deleteAllClientsAccountsSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_CLIENTS_ACCOUNTS_SUCCESS,
        payload: result,
    };
    };

export const getClientsAccountsFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_CLIENTS_ACCOUNTS_FAILURE,
        payload: error,
    };
};
export const addClientAccountFailureAction = (error) => {
    return {
        type: FETCH_ADD_CLIENT_ACCOUNT_FAILURE,
        payload: error
    };
};

export const getClientsAccounts = body => async (dispatch, getState) => {
    dispatch(getClientsAccountsRequestAction());

    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = API.getByPage(body.page,body.take);

    promise.then((response) => {
        const records = response.data.result.result.map(item => {return { ...item, checked: false }});
        dispatch(getClientsAccountsSuccessAction({...response.data.result,records}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in ClientsAccounts"//getErrorMessage(error.response.data.error.code);
        dispatch(getClientsAccountsFailureAction(errorMsg));
    });
};
export const deleteAllClientsAccounts = () => async (dispatch, getState) => {
    dispatch(getClientsAccountsRequestAction());

    const promise = API.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllClientsAccountsSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getClientsAccountsFailureAction(errorMsg));
    });
};
export const deleteClientsAccountsGroup = body => async (dispatch, getState) => {
    dispatch(getClientsAccountsRequestAction());

    const promise = API.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteClientAccount', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getClientsAccountsFailureAction(errorMsg));
    });
};
export const addClientAccount = body => async (dispatch, getState) =>{
    dispatch(getClientsAccountsRequestAction());
    const promise = API.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_CLIENT_ACCOUNT, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
        errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        dispatch(addClientAccountFailureAction(errorMsg));
    });
};


export const editClientAccount = options => async (dispatch, getState) =>{
    dispatch(getClientsAccountsRequestAction());
    const {id, body} = options;
    const promise = API.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_CLIENT_ACCOUNT, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        dispatch(addClientAccountFailureAction(errorMsg));
    });
};


export async function initEditClientAccount(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_CLIENT_ACCOUNT, payload: "" }) 
}


export const deleteClientAccount = body => async (dispatch, getState) =>{
    const promise = API.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteClientAccount', payload: body })
        }
    );
};

export const selectClientAccount = id => async (dispatch, getState) =>{
    dispatch({ type: 'SelectClientAccount', payload: id })
};
export const SelectAllClientsAccounts = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAllClientAccount', payload: checkType })
}