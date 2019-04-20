import * as types from '../actions/types';

const initialState = {
    loggedIn: false,
    token: null
};

export default (state = initialState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case types.GET_AUTH:
            return { ...state };
        default: return state;
    }
}
