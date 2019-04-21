import * as types from '../actions/types';

const initialState = {
    message: "",
    status: null,
    _id: null
};

export default (state = initialState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case types.GET_ERRORS:
            return {
                message: action.payload.message,
                status: action.payload.status,
                _id: action.payload._id
            };
        case types.CLEAR_ERRORS:
            return initialState;

        default: return state;
    }
}
