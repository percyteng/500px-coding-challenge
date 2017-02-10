import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import allReducers from './reducers/index'
import App from './components/homePage'
const store = createStore(allReducers)

render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,document.getElementById("app")
)
