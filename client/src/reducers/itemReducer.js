import * as types from '../actions/types';

const initialState = {
    items: [],
    loading: false
};

export default (state = initialState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case types.ITEMS_LOADING:
            return { ...state, loading: action.payload }
        case types.GET_ITEMS:
            return { ...state, items: action.payload, loading: false };
        case types.ADD_ITEM:
            return { ...state, items: [...state.items, action.payload], loading: false };
        case types.DELETE_ITEM:
            return { ...state, items: state.items.filter(item => item._id !== action.payload), loading: false };
        case types.ADD_SAMPLE_DATA:
            return action.payload;
        default: return state;
    }
}
