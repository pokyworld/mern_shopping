import * as types from './types';

export const getErrors = (message, status, _id) => ({
    type: types.GET_ERRORS,
    payload: { message, status, _id }
});

export const clearErrors = () => ({
    type: types.CLEAR_ERRORS,
    payload: null
});