import {
    FETCH_GET_ALL_DRIVERS_ACCOUNTS_REQUEST,
    FETCH_GET_ALL_DRIVERS_ACCOUNTS_SUCCESS,
    FETCH_GET_ALL_DRIVERS_ACCOUNTS_FAILURE,
    FETCH_ADD_DRIVER_ACCOUNT_FAILURE,
    FETCH_ADD_DRIVER_ACCOUNT,
    FETCH_EDIT_DRIVER_ACCOUNT,
    FETCH_INIT_EDIT_DRIVER_ACCOUNT,
    FETCH_DELETE_ALL_DRIVERS_ACCOUNTS_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const API = require ('./API');

export const getDriversAccountsRequestAction = () => {
    return {
      type: FETCH_GET_ALL_DRIVERS_ACCOUNTS_REQUEST,
    };
};

export const getDriversAccountsSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_DRIVERS_ACCOUNTS_SUCCESS,
    payload: result,
};
};

export const deleteAllDriversAccountsSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_DRIVERS_ACCOUNTS_SUCCESS,
        payload: result,
    };
    };

export const getDriversAccountsFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_DRIVERS_ACCOUNTS_FAILURE,
        payload: error,
    };
};
export const addDriverAccountFailureAction = (error) => {
    return {
        type: FETCH_ADD_DRIVER_ACCOUNT_FAILURE,
        payload: error
    };
};

export const getDriversAccounts = body => async (dispatch, getState) => {
    dispatch(getDriversAccountsRequestAction());

    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = API.getByPage(body.page,body.take);

    promise.then((response) => {
        const records = response.data.result.result.map(item => {return { ...item, checked: false }});
        dispatch(getDriversAccountsSuccessAction({...response.data.result,records}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in DriversAccounts"//getErrorMessage(error.response.data.error.code);
        dispatch(getDriversAccountsFailureAction(errorMsg));
    });
};
export const deleteAllDriversAccounts = () => async (dispatch, getState) => {
    dispatch(getDriversAccountsRequestAction());

    const promise = API.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllDriversAccountsSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getDriversAccountsFailureAction(errorMsg));
    });
};
export const deleteDriversAccountsGroup = body => async (dispatch, getState) => {
    dispatch(getDriversAccountsRequestAction());

    const promise = API.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteDriverAccount', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getDriversAccountsFailureAction(errorMsg));
    });
};
export const addDriverAccount = body => async (dispatch, getState) =>{
    dispatch(getDriversAccountsRequestAction());
    const promise = API.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_DRIVER_ACCOUNT, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
        errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        dispatch(addDriverAccountFailureAction(errorMsg));
    });
};


export const editDriverAccount = options => async (dispatch, getState) =>{
    dispatch(getDriversAccountsRequestAction());
    const {id, body} = options;
    const promise = API.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_DRIVER_ACCOUNT, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        dispatch(addDriverAccountFailureAction(errorMsg));
    });
};


export async function initEditDriverAccount(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_DRIVER_ACCOUNT, payload: "" }) 
}


export const deleteDriverAccount = body => async (dispatch, getState) =>{
    const promise = API.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteDriverAccount', payload: body })
        }
    );
};

export const selectDriverAccount = id => async (dispatch, getState) =>{
    dispatch({ type: 'SelectDriverAccount', payload: id })
};
export const SelectAllDriversAccounts = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAllDriverAccount', payload: checkType })
}