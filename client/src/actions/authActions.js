import * as types from './types';
import axios from 'axios';

import { getErrors } from './errorActions';
import { clearErrors } from './errorActions';

export const userLoading = (value = true) => ({
    type: types.USER_LOADING,
    payload: value
});

export const registerSuccess = (payload) => ({
    type: types.REGISTER_SUCCESS, payload
});

export const loginSuccess = (payload) => ({
    type: types.LOGIN_SUCCESS, payload
});

// Check token and Load User
export const loadUser = () => (dispatch, getState) => {

    // Set User Loading
    dispatch(userLoading(true));

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: types.USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(getErrors(err.response.data.message, err.response.status, "USER_LOADING"))
            dispatch({ type: types.AUTH_ERROR })
        });
};

export const registerUser = ({ name, email, password }) => dispatch => {

    // Request Headers
    const config = createConfig();

    // Request Body
    const body = JSON.stringify({ name, email, password });

    // Post data
    axios.post('/api/users', body, config)
        .then(res => {
            // console.log(res.data);
            dispatch(registerSuccess(res.data));
        })
        .catch(err => {
            dispatch(getErrors(err.response.data.message, err.response.status, "REGISTER_FAIL"))
            dispatch({ type: types.REGISTER_FAIL })
        });
};

export const login = ({ email, password }) => dispatch => {

    // Request Headers
    const config = createConfig();

    // Request Body
    const body = JSON.stringify({ email, password });

    // Post data
    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch(loginSuccess(res.data));
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(getErrors(err.response.data.message, err.response.status, "LOGIN_FAIL"))
            dispatch({ type: types.LOGIN_FAIL })
        });
};

export const logout = () => dispatch => {
    dispatch({ type: types.LOGOUT, payload: null });
    dispatch(clearErrors());
}

export const createConfig = () => {
    // Headers
    const config = { headers: { "Content-Type": "application/json" } }

    return config;
};

export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token;

    // Headers
    const config = { headers: { "Content-Type": "application/json" } }

    // If token, add to headers
    if (token) { config.headers["x-auth-token"] = token; }

    return config;
};

