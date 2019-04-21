import * as types from './types';
import axios from 'axios';

import { getErrors } from './errorActions';

export const userLoading = (value = true) => ({
    type: types.USER_LOADING,
    payload: value
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
            dispatch(getErrors(err.response.data.message, err.response.status))
            dispatch({ type: types.AUTH_ERROR })
        });
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
