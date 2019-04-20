// import uuid from 'uuid';
import moment from 'moment';
import axios from 'axios';

import * as types from './types';

// const getSampleData = () => {
//     return [
//         { id: uuid(), name: "Eggs", date: moment.utc().format() },
//         { id: uuid(), name: "Bacon", date: moment.utc().format() },
//         { id: uuid(), name: "HP Sauce", date: moment.utc().format() },
//         { id: uuid(), name: "Bread", date: moment.utc().format() },
//         { id: uuid(), name: "Potatoes", date: moment.utc().format() }
//     ];
// }

export const setItemsLoading = (value) => ({
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
        })
        .catch(err => console.log(err));
};

export const addItem = ({ name }) => dispatch => {
    dispatch(setItemsLoading(true));
    axios.post('/api/items', { name, date: moment().format() })
        .then(res => {
            dispatch({
                type: types.ADD_ITEM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

export const deleteItem = (_id) => dispatch => {
    dispatch(setItemsLoading(true));
    axios.delete(`/api/items/${_id}`)
        .then(res => {
            if (res.data.success === true) {
                dispatch({
                    type: types.DELETE_ITEM,
                    payload: _id
                })
            }
        })
        .catch(err => console.log(err));
};

// export const addSampleData = () => ({
//     type: types.ADD_SAMPLE_DATA,
//     payload: getSampleData()
// });
