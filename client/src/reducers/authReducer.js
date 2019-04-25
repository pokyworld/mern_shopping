import * as types from '../actions/types';

const initialState = {
    token: localStorage.token,
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default (state = initialState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case types.USER_LOADING:
            return { ...state, isLoading: action.payload };
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case types.AUTH_ERROR:
        case types.LOGIN_FAIL:
        case types.REGISTER_FAIL:
            localStorage.removeItem("token");
            return { ...initialState, token: null };
        case types.LOGOUT:
            return { ...initialState, token: null };

        default: return state;
    }
}
