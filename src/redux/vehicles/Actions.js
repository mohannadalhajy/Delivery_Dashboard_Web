import {
    FETCH_GET_ALL_VEHICLES_REQUEST,
    FETCH_GET_ALL_VEHICLES_SUCCESS,
    FETCH_GET_ALL_VEHICLES_FAILURE,
    FETCH_ADD_VEHICLE_FAILURE,
    FETCH_ADD_VEHICLE,
    FETCH_EDIT_VEHICLE,
    FETCH_INIT_EDIT_VEHICLE,
    FETCH_DELETE_ALL_VEHICLES_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const API = require ('./API');

export const getVehiclesRequestAction = () => {
    return {
      type: FETCH_GET_ALL_VEHICLES_REQUEST,
    };
};

export const getVehiclesSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_VEHICLES_SUCCESS,
    payload: result,
};
};

export const deleteAllVehiclesSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_VEHICLES_SUCCESS,
        payload: result,
    };
    };

export const getVehiclesFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_VEHICLES_FAILURE,
        payload: error,
    };
};
export const addVehicleFailureAction = (error) => {
    return {
        type: FETCH_ADD_VEHICLE_FAILURE,
        payload: error
    };
};

export const getVehicles = body => async (dispatch, getState) => {
    dispatch(getVehiclesRequestAction());

    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = API.getByPage(body.page,body.take);

    promise.then((response) => {
        const vehicles = response.data.result.result.map(item => {return { ...item, checked: false }});
        dispatch(getVehiclesSuccessAction({...response.data.result,vehicles:vehicles}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Vehicles"//getErrorMessage(error.response.data.error.code);
        dispatch(getVehiclesFailureAction(errorMsg));
    });
};
export const deleteAllVehicles = () => async (dispatch, getState) => {
    dispatch(getVehiclesRequestAction());

    const promise = API.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllVehiclesSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getVehiclesFailureAction(errorMsg));
    });
};
export const deleteVehiclesGroup = body => async (dispatch, getState) => {
    dispatch(getVehiclesRequestAction());

    const promise = API.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteVehicle', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getVehiclesFailureAction(errorMsg));
    });
};

export const addVehicle = body => async (dispatch, getState) =>{
    dispatch(getVehiclesRequestAction());
    const promise = API.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_VEHICLE, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
        errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        dispatch(addVehicleFailureAction(errorMsg));
    });
};


export const editVehicle = options => async (dispatch, getState) =>{
    dispatch(getVehiclesRequestAction());
    const {id, body} = options;
    const promise = API.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_VEHICLE, payload: res.data })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        dispatch(addVehicleFailureAction(errorMsg));
    });
};


export async function initEditVehicle(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_VEHICLE, payload: "" }) 
}


export const deleteVehicle = body => async (dispatch, getState) =>{
    const promise = API.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteVehicle', payload: body })
        }
    );
};

export const selectVehicle = id => async (dispatch, getState) =>{
    dispatch({ type: 'Select', payload: id })
};
export const SelectAll = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAll', payload: checkType })
}