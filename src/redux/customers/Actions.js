import {
    FETCH_GET_ALL_CUSTOMERS_REQUEST,
    FETCH_GET_ALL_CUSTOMERS_SUCCESS,
    FETCH_GET_ALL_CUSTOMERS_FAILURE,
    FETCH_ADD_CUSTOMER_FAILURE,
    FETCH_ADD_CUSTOMER,
    FETCH_EDIT_CUSTOMER,
    FETCH_INIT_EDIT_CUSTOMER,
    FETCH_DELETE_ALL_CUSTOMERS_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const client = require ('./API');

export const getCustomersRequestAction = () => {
    return {
      type: FETCH_GET_ALL_CUSTOMERS_REQUEST,
    };
};

export const getCustomersSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_CUSTOMERS_SUCCESS,
    payload: result,
};
};

export const deleteAllCustomersSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_CUSTOMERS_SUCCESS,
        payload: result,
    };
    };

export const getCustomersFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_CUSTOMERS_FAILURE,
        payload: error,
    };
};
export const addCustomerFailureAction = (error) => {
    return {
        type: FETCH_ADD_CUSTOMER_FAILURE,
        payload: error
    };
};

export const getCustomers = body => async (dispatch, getState) => {
    dispatch(getCustomersRequestAction());
    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = client.getByPage(body.page,body.take);

    promise.then((response) => {
        const customers = response.data.result.result.map(item => {return { ...item, checked: false }});
        dispatch(getCustomersSuccessAction({...response.data.result,customers:customers}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Customers"//getErrorMessage(error.response.data.error.code);
        dispatch(getCustomersFailureAction(errorMsg));
    });
};


export const deleteAllCustomers = () => async (dispatch, getState) => {
    dispatch(getCustomersRequestAction());

    const promise = client.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllCustomersSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getCustomersFailureAction(errorMsg));
    });
};
export const deleteCustomersGroup = body => async (dispatch, getState) => {
    dispatch(getCustomersRequestAction());

    const promise = client.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteCustomer', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getCustomersFailureAction(errorMsg));
    });
};
// export const deleteAllCustomers = body => async (dispatch, getState) => {
//     dispatch(getCustomersRequestAction());

//     const promise = customer.deleteAll()

//     promise.then((response) => {
//         dispatch(deleteAllCustomersSuccessAction());
//     })
//     promise.catch((error) => {
//         let errorMsg = "error"
//         if(error.response)
//             errorMsg = getErrorMessage(error.response.data.error.code);
//         dispatch(getCustomersFailureAction(errorMsg));
//     });
// };
// export const getCustomersBySearch = body => async (dispatch, getState) => {
//     dispatch(getCustomersRequestAction());

//     const promise = customer.search(body);

//     promise.then((response) => {
//         const customers = response.data.result.customers.map(item => {return { ...item, checked: false }});
//         dispatch(getCustomersSuccessAction({...response.data.result,customers:customers}));
//     })
//     promise.catch((error) => {
//         const errorMsg = getErrorMessage(error.response.data.error.code);
//         //const errorMsg = "error in Customers"//getErrorMessage(error.response.data.error.code);
//         dispatch(getCustomersFailureAction(errorMsg));
//     });
// };


export const addCustomer = body => async (dispatch, getState) =>{
    dispatch(getCustomersRequestAction());
    const promise = client.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_CUSTOMER, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = ""
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        else errorMsg = "error"
        dispatch(addCustomerFailureAction(errorMsg));
    });
};


export const editCustomer = options => async (dispatch, getState) =>{
    dispatch(getCustomersRequestAction());
    const {id, body} = options;
    const promise = client.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_CUSTOMER, payload: res.data })
        }
    ).catch(err=>{
        let errorMsg = ""
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        else errorMsg = "error"
        dispatch(addCustomerFailureAction(errorMsg));
    });
};


export async function initEditCustomer(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_CUSTOMER, payload: "" }) 
}
/*export async function getCustomers(dispatch, getState) {
    const promise = customer.get();
    promise.then(res =>  {
        const list = res.data.map(item => {return { ...item, checked: false }});
        dispatch({ type: 'getAllCustomers', payload: list }) 
    });
}*/


export const deleteCustomer = body => async (dispatch, getState) =>{
    const promise = client.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteCustomer', payload: body })
        }
    );
};

export const selectCustomer = id => async (dispatch, getState) =>{
    dispatch({ type: 'Select', payload: id })
};
export const SelectAll = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAll', payload: checkType })
}