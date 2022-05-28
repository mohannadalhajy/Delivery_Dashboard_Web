import {
    FETCH_GET_ALL_CHARGES_REQUEST,
    FETCH_GET_ALL_CHARGES_SUCCESS,
    FETCH_GET_ALL_CHARGES_FAILURE,
    FETCH_ADD_CHARGE_FAILURE,
    FETCH_ADD_CHARGE,
    FETCH_EDIT_CHARGE,
    FETCH_INIT_EDIT_CHARGE,
    FETCH_DELETE_ALL_CHARGES_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const API = require ('./API');

export const getChargesRequestAction = () => {
    return {
      type: FETCH_GET_ALL_CHARGES_REQUEST,
    };
};

export const getChargesSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_CHARGES_SUCCESS,
    payload: result,
};
};

export const deleteAllChargesSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_CHARGES_SUCCESS,
        payload: result,
    };
    };

export const getChargesFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_CHARGES_FAILURE,
        payload: error,
    };
};
export const addChargeFailureAction = (error) => {
    return {
        type: FETCH_ADD_CHARGE_FAILURE,
        payload: error
    };
};

export const getCharges = body => async (dispatch, getState) => {
    dispatch(getChargesRequestAction());

    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = API.getByPage(body.page,body.take);

    promise.then((response) => {
        const records = response.data.result.result.map(item => {return { ...item, checked: false }});
        dispatch(getChargesSuccessAction({...response.data.result,records}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Charges"//getErrorMessage(error.response.data.error.code);
        dispatch(getChargesFailureAction(errorMsg));
    });
};
export const deleteAllCharges = () => async (dispatch, getState) => {
    dispatch(getChargesRequestAction());

    const promise = API.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllChargesSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getChargesFailureAction(errorMsg));
    });
};
export const deleteChargesGroup = body => async (dispatch, getState) => {
    dispatch(getChargesRequestAction());

    const promise = API.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteCharge', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getChargesFailureAction(errorMsg));
    });
};
export const addCharge = body => async (dispatch, getState) =>{
    dispatch(getChargesRequestAction());
    const promise = API.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_CHARGE, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
        errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        dispatch(addChargeFailureAction(errorMsg));
    });
};


export const editCharge = options => async (dispatch, getState) =>{
    dispatch(getChargesRequestAction());
    const {id, body} = options;
    const promise = API.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_CHARGE, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        dispatch(addChargeFailureAction(errorMsg));
    });
};


export async function initEditCharge(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_CHARGE, payload: "" }) 
}


export const deleteCharge = body => async (dispatch, getState) =>{
    const promise = API.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteCharge', payload: body })
        }
    );
};

export const selectCharge = id => async (dispatch, getState) =>{
    dispatch({ type: 'SelectCharge', payload: id })
};
export const SelectAllCharges = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAllCharge', payload: checkType })
}