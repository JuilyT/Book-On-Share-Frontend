import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import reducers from './reducers';
import './index.scss';
import App from './App';
import { loadState, saveState } from './utils/localStorage';

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(throttle(()=>{
    saveState({
        auth: store.getState().auth,
        currentUser: store.getState().currentUser
    });
}, 1000));

ReactDOM.render(
    (
        <Provider store= {store}>
            <App/>
        </Provider>
    ),
    document.querySelector('#root')
)