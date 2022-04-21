import {
    FETCH_GET_ALL_ORDERS_REQUEST,
    FETCH_GET_ALL_ORDERS_SUCCESS,
    FETCH_GET_ALL_ORDERS_FAILURE,
    FETCH_ADD_ORDER_FAILURE,
    FETCH_ADD_ORDER,
    FETCH_EDIT_ORDER,
    FETCH_INIT_EDIT_ORDER,
    FETCH_DELETE_ALL_ORDERS_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const API = require ('./API');

export const getOrdersRequestAction = () => {
    return {
      type: FETCH_GET_ALL_ORDERS_REQUEST,
    };
};

export const getOrdersSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_ORDERS_SUCCESS,
    payload: result,
};
};

export const deleteAllOrdersSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_ORDERS_SUCCESS,
        payload: result,
    };
    };

export const getOrdersFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_ORDERS_FAILURE,
        payload: error,
    };
};
export const addOrderFailureAction = (error) => {
    return {
        type: FETCH_ADD_ORDER_FAILURE,
        payload: error
    };
};

export const getOrders = body => async (dispatch, getState) => {
    dispatch(getOrdersRequestAction());

    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = API.getByPage(body.page,body.take, body.type);

    promise.then((response) => {
        const orders = response.data.result.result.map(item => {return { ...item, checked: false }});
        dispatch(getOrdersSuccessAction({...response.data.result,orders:orders}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Orders"//getErrorMessage(error.response.data.error.code);
        dispatch(getOrdersFailureAction(errorMsg));
    });
};
export const deleteAllOrders = () => async (dispatch, getState) => {
    dispatch(getOrdersRequestAction());

    const promise = API.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllOrdersSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getOrdersFailureAction(errorMsg));
    });
};
export const deleteOrdersGroup = body => async (dispatch, getState) => {
    dispatch(getOrdersRequestAction());

    const promise = API.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteOrder', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getOrdersFailureAction(errorMsg));
    });
};
// export const getOrdersBySearch = body => async (dispatch, getState) => {
//     dispatch(getOrdersRequestAction());

//     const promise = API.search(body);

//     promise.then((response) => {
//         const orders = response.data.result.orders.map(item => {return { ...item, checked: false }});
//         dispatch(getOrdersSuccessAction({...response.data.result,orders:orders}));
//     })
//     promise.catch((error) => {
//         const errorMsg = getErrorMessage(error.response.data.error.code);
//         //const errorMsg = "error in Orders"//getErrorMessage(error.response.data.error.code);
//         dispatch(getOrdersFailureAction(errorMsg));
//     });
// };


export const addOrder = body => async (dispatch, getState) =>{
    dispatch(getOrdersRequestAction());
    const promise = API.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_ORDER, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
        errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        dispatch(addOrderFailureAction(errorMsg));
    });
};


export const editOrder = options => async (dispatch, getState) =>{
    dispatch(getOrdersRequestAction());
    const {id, body} = options;
    const promise = API.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_ORDER, payload: res.data })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        dispatch(addOrderFailureAction(errorMsg));
    });
};
export const editOrderDriver = options => async (dispatch, getState) =>{
    dispatch(getOrdersRequestAction());
    const {id, body} = options;
    const promise = API.patchDriver(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_ORDER, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = "Error"
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        dispatch(addOrderFailureAction(errorMsg));
    });
};


export async function initEditOrder(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_ORDER, payload: "" }) 
}
/*export async function getOrders(dispatch, getState) {
    const promise = API.get();
    promise.then(res =>  {
        const list = res.data.map(item => {return { ...item, checked: false }});
        dispatch({ type: 'getAllOrders', payload: list }) 
    });
}*/


export const deleteOrder = body => async (dispatch, getState) =>{
    const promise = API.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteOrder', payload: body })
        }
    );
};

export const selectOrder = id => async (dispatch, getState) =>{
    dispatch({ type: 'Select', payload: id })
};
export const SelectAll = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAll', payload: checkType })
}