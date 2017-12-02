import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import App from './Root/App'
import reducer from './reducers'
import './index.css'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose

const store = createStore(
    reducer,
    composeEnchancers(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'))