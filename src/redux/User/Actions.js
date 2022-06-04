import getErrorMessage from "../../Errors";
import {
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    FETCH_PROFILE_REQUEST,
    FETCH_EDIT_EMAIL_SUCCESS,
    FETCH_PROFILE_FAILURE,
    FETCH_RESET_PASS_SUCCESS,
    FETCH_INIT_EDIT_PROFILE,
    FETCH_INIT_PROFILE
} from "./ActionTypes";
import messaging from '../../FirebaseConf'
import { getToken } from "firebase/messaging";

const clientAuth = require('./API');

export const loginRequestAction = () => {
    return {
        type: FETCH_LOGIN_REQUEST,
    };
};

export const loginSuccessAction = (user) => {
    return {
        type: FETCH_LOGIN_SUCCESS,
        payload: user,
    };
};

export const loginFailureAction = (error) => {
    return {
        type: FETCH_LOGIN_FAILURE,
        payload: error,
    };
};

export const login = body => async (dispatch, getState) => {
    dispatch(loginRequestAction());
    const firebaseToken = await getToken(
        messaging, 
        { vapidKey: 'BGKxsZKcTHGI08qArtUOAdlxa12Og_DpMJ6JjKnWQIGuH-i7sKpMGAbj1icCAUJUlEln_b-W0-8IvPEqJwxyHyk' }
        )
    ///2NpOjFNyHGNSCTithmeXIG-JGsZkxIfsA-7NUXQ28Zs
    console.log("firebaseToken",firebaseToken)
    const promise = clientAuth.login({...body, firebaseToken});
    promise.then((response) => {
        const result = response.data.result;
        localStorage.setItem("accessToken", result.accessToken);
        console.log("User To Show : \n", result);
        dispatch(loginSuccessAction(result.user));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(loginFailureAction(errorMsg));
    });
};



export async function profileMe(dispatch, getState) {
    dispatch(loginRequestAction());

    const promise = clientAuth.getProfile();

    promise.then((response) => {
        const user = response.data.result;
        dispatch(loginSuccessAction(user));
    })
    promise.catch((error) => {
        localStorage.removeItem("accessToken");
        //const errorMsg = getErrorMessage(error.response.data.error.code);
        //dispatch(loginFailureAction(errorMsg));
    });
};
export const logout = () => {
    return (dispatch) => {
        dispatch(loginRequestAction());
        const promise = clientAuth.logout();
        promise.then((response) => {
            localStorage.removeItem("accessToken");
            dispatch(profileMe)
            dispatch(loginSuccessAction({}));

        })
        promise.catch((error) => {
            let errorMsg = ""
            if(error.response)
                errorMsg = getErrorMessage(error.response.data.error.code);
            else errorMsg = "Network Failed"
            dispatch(loginFailureAction(errorMsg));
        });
    };
};
export const editEmailRequestAction = () => {
    return {
        type: FETCH_PROFILE_REQUEST,
    };
};
export const editUserSuccessAction = (user) => {
    return {
        type: FETCH_EDIT_EMAIL_SUCCESS,
        payload: user,
    };
};
export const verifyCodeUserFailureAction = (error) => {
    return {
        type: FETCH_PROFILE_FAILURE,
        payload: error,
    };
};

export const editEmail = (body) => {
    return (dispatch) => {
        dispatch(editEmailRequestAction());
        const promise = clientAuth.editEmail(body);
        promise.then((response) => {
            dispatch(editUserSuccessAction(body.newEmail));
        })
        promise.catch((error) => {
            let errorMsg = ""
            if(error.response)
                errorMsg = getErrorMessage(error.response.data.error.message.code);
            else errorMsg = "Network Failed"
            dispatch(verifyCodeUserFailureAction(errorMsg));
        });
    };
};

export const resetPasswordSuccessAction = () => {
    return {
        type: FETCH_RESET_PASS_SUCCESS,
        payload: "",
    };
};
export const resetPass = (body) => {
    return (dispatch) => {
        dispatch(editEmailRequestAction());
        const promise = clientAuth.resetPass(body);
        promise.then((response) => {
            dispatch(resetPasswordSuccessAction());
        })
        promise.catch((error) => {
            let errorMsg = ""
            if(error.response)
                errorMsg = getErrorMessage(error.response.data.error.message.code);
            else errorMsg = "Network Failed"
            dispatch(verifyCodeUserFailureAction(errorMsg));
        });
    };
};

export async function initEditProfile(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_PROFILE, payload: "" }) 
}
export async function initProfile(dispatch, getState) {
    dispatch({ type: FETCH_INIT_PROFILE, payload: "" }) 
}



