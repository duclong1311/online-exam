export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCESS = 'FETCH_USER_SUCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data,
    }
}

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    }
}

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const fetchUserSucess = (payload) => {
    return {
        type: FETCH_USER_SUCESS
    }
}

export const fetchUserError = (payload) => {
    return {
        type: FETCH_USER_ERROR
    }
}