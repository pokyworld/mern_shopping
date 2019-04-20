import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const middleware = [thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configStore = (state = initialState) => {
    const store = createStore(
        rootReducer,
        state,
        composeEnhancers(applyMiddleware(...middleware), ...enhancers)
    )
    return store;
}

export default configStore;

