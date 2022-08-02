import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import allReducers from './reducers';
import thunk from 'react-thunk'

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ || compose
const store = createStore(allReducers,  enhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}><App /></Provider>
    , document.getElementById('root')
)