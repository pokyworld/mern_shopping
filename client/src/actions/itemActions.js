import moment from 'moment';
import axios from 'axios';

import * as types from './types';
import { tokenConfig } from './authActions';
import { getErrors } from './errorActions';

export const setItemsLoading = (value = true) => ({
    type: types.ITEMS_LOADING,
    payload: value
});

export const getItems = () => dispatch => {
    dispatch(setItemsLoading(true));
    axios.get('/api/items')
        .then(res => {
            dispatch({
                type: types.GET_ITEMS,
                payload: res.data
            });
            dispatch(setItemsLoading(false));
        })
        .catch(err => {
            dispatch(getErrors(err.response.data, err.response.status))
            dispatch(setItemsLoading(false));
        });
};

export const addItem = ({ name }) => (dispatch, getState) => {
    dispatch(setItemsLoading(true));
    axios.post('/api/items', { name, date: moment().format() }, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: types.ADD_ITEM,
                payload: res.data
            });
            dispatch(setItemsLoading(false));
        })
        .catch(err => {
            dispatch(getErrors(err.response.data, err.response.status))
            dispatch(setItemsLoading(false));
        });
};

export const deleteItem = (_id) => (dispatch, getState) => {
    dispatch(setItemsLoading(true));
    axios.delete(`/api/items/${_id}`, tokenConfig(getState))
        .then(res => {
            if (res.data.success === true) {
                dispatch({
                    type: types.DELETE_ITEM,
                    payload: _id
                });
                dispatch(setItemsLoading(false));
            }
        })
        .catch(err => {
            dispatch(getErrors(err.response.data, err.response.status))
            dispatch(setItemsLoading(false));
        });
};
