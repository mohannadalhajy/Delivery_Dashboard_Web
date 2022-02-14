import {
    FETCH_GET_ALL_CLIENTS_REQUEST,
    FETCH_GET_ALL_CLIENTS_SUCCESS,
    FETCH_GET_ALL_CLIENTS_FAILURE,
    FETCH_ADD_CLIENT_FAILURE,
    FETCH_ADD_CLIENT,
    FETCH_EDIT_CLIENT,
    FETCH_INIT_EDIT_CLIENT,
    FETCH_DELETE_ALL_CLIENTS_SUCCESS
} from './ActionTypes'
import getErrorMessage from "../../Errors";
const client = require ('./API');

export const getClientsRequestAction = () => {
    return {
      type: FETCH_GET_ALL_CLIENTS_REQUEST,
    };
};

export const getClientsSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_CLIENTS_SUCCESS,
    payload: result,
};
};

export const deleteAllClientsSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_ALL_CLIENTS_SUCCESS,
        payload: result,
    };
    };

export const getClientsFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_CLIENTS_FAILURE,
        payload: error,
    };
};
export const addClientFailureAction = (error) => {
    return {
        type: FETCH_ADD_CLIENT_FAILURE,
        payload: error
    };
};

export const getClients = body => async (dispatch, getState) => {
    dispatch(getClientsRequestAction());
    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = client.getByPage(body.page,body.take);

    promise.then((response) => {
        const clients = response.data.result.result.map(item => {return { ...item, checked: false }});
        dispatch(getClientsSuccessAction({...response.data.result,clients:clients}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Clients"//getErrorMessage(error.response.data.error.code);
        dispatch(getClientsFailureAction(errorMsg));
    });
};


export const deleteAllClients = () => async (dispatch, getState) => {
    dispatch(getClientsRequestAction());

    const promise = client.deleteAll()

    promise.then((response) => {
        dispatch(deleteAllClientsSuccessAction());
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getClientsFailureAction(errorMsg));
    });
};
export const deleteClientsGroup = body => async (dispatch, getState) => {
    dispatch(getClientsRequestAction());

    const promise = client.deleteGroup(body)

    promise.then((response) => {
        body.forEach(id => dispatch({ type: 'DeleteClient', payload: id}))
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getClientsFailureAction(errorMsg));
    });
};
// export const deleteAllClients = body => async (dispatch, getState) => {
//     dispatch(getClientsRequestAction());

//     const promise = client.deleteAll()

//     promise.then((response) => {
//         dispatch(deleteAllClientsSuccessAction());
//     })
//     promise.catch((error) => {
//         let errorMsg = "error"
//         if(error.response)
//             errorMsg = getErrorMessage(error.response.data.error.code);
//         dispatch(getClientsFailureAction(errorMsg));
//     });
// };
// export const getClientsBySearch = body => async (dispatch, getState) => {
//     dispatch(getClientsRequestAction());

//     const promise = client.search(body);

//     promise.then((response) => {
//         const clients = response.data.result.clients.map(item => {return { ...item, checked: false }});
//         dispatch(getClientsSuccessAction({...response.data.result,clients:clients}));
//     })
//     promise.catch((error) => {
//         const errorMsg = getErrorMessage(error.response.data.error.code);
//         //const errorMsg = "error in Clients"//getErrorMessage(error.response.data.error.code);
//         dispatch(getClientsFailureAction(errorMsg));
//     });
// };


export const addClient = body => async (dispatch, getState) =>{
    dispatch(getClientsRequestAction());
    const promise = client.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_CLIENT, payload: res.data.result })
        }
    ).catch(err=>{
        let errorMsg = ""
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code)
        else errorMsg = "error"
        dispatch(addClientFailureAction(errorMsg));
    });
};


export const editClient = options => async (dispatch, getState) =>{
    dispatch(getClientsRequestAction());
    const {id, body} = options;
    const promise = client.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_CLIENT, payload: res.data })
        }
    ).catch(err=>{
        let errorMsg = ""
        if(err.response.data.error.message.arrayError)
            errorMsg = getErrorMessage(err.response.data.error.message.arrayError[0].code);
        else errorMsg = "error"
        dispatch(addClientFailureAction(errorMsg));
    });
};


export async function initEditClient(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_CLIENT, payload: "" }) 
}
/*export async function getClients(dispatch, getState) {
    const promise = client.get();
    promise.then(res =>  {
        const list = res.data.map(item => {return { ...item, checked: false }});
        dispatch({ type: 'getAllClients', payload: list }) 
    });
}*/


export const deleteClient = body => async (dispatch, getState) =>{
    const promise = client.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteClient', payload: body })
        }
    );
};

export const selectClient = id => async (dispatch, getState) =>{
    dispatch({ type: 'Select', payload: id })
};
export const SelectAll = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAll', payload: checkType })
}