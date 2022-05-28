import {
    FETCH_GET_ALL_DRIVERS_REQUEST,
    FETCH_GET_ALL_DRIVERS_SUCCESS,
    FETCH_GET_ALL_DRIVERS_FAILURE,
    FETCH_ADD_DRIVER_FAILURE,
    FETCH_ADD_DRIVER,
    FETCH_EDIT_DRIVER,
    FETCH_INIT_EDIT_DRIVER,
    FETCH_DELETE_ALL_DRIVERS_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const API = require ('./API');

export const getDriversRequestAction = () => {
    return {
      type: FETCH_GET_ALL_DRIVERS_REQUEST,
    };
};

export const getDriversSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_DRIVERS_SUCCESS,
    payload: result,
};
};

export const deleteAllDriversSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_DRIVERS_SUCCESS,
        payload: result,
    };
    };

export const getDriversFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_DRIVERS_FAILURE,
        payload: error,
    };
};
export const addDriverFailureAction = (error) => {
    return {
        type: FETCH_ADD_DRIVER_FAILURE,
        payload: error
    };
};

export const getDrivers = body => async (dispatch, getState) => {
    dispatch(getDriversRequestAction());
    const promise = API.get();
    promise.then((response) => {
        const drivers = response.data.result.drivers.map(item => {return { ...item, checked: false }});
        dispatch(getDriversSuccessAction({...response.data.result,drivers:drivers}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getDriversFailureAction(errorMsg));
    });
};


export const deleteAllDrivers = () => async (dispatch, getState) => {
    dispatch(getDriversRequestAction());

    const promise = API.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllDriversSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getDriversFailureAction(errorMsg));
    });
};
export const deleteDriversGroup = body => async (dispatch, getState) => {
    dispatch(getDriversRequestAction());

    const promise = API.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteDriver', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getDriversFailureAction(errorMsg));
    });
};


export const addDriver = body => async (dispatch, getState) =>{
    dispatch(getDriversRequestAction());
    const promise = API.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_DRIVER, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = ""
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        else errorMsg = "error"
        dispatch(addDriverFailureAction(errorMsg));
    });
};


export const editDriver = options => async (dispatch, getState) =>{
    dispatch(getDriversRequestAction());
    const {id, body} = options;
    const promise = API.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_DRIVER, payload: res.data })
        }
    ).catch(err=>{
        let errorMsg = ""
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        else errorMsg = "error"
        dispatch(addDriverFailureAction(errorMsg));
    });
};


export async function initEditDriver(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_DRIVER, payload: "" }) 
}
/*export async function getDrivers(dispatch, getState) {
    const promise = API.get();
    promise.then(res =>  {
        const list = res.data.map(item => {return { ...item, checked: false }});
        dispatch({ type: 'getAllDrivers', payload: list }) 
    });
}*/


export const deleteDriver = body => async (dispatch, getState) =>{
    const promise = API.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteDriver', payload: body })
        }
    );
};

export const selectDriver = id => async (dispatch, getState) =>{
    dispatch({ type: 'Select', payload: id })
};
export const SelectAll = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAll', payload: checkType })
}