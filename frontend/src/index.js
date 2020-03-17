import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router } from 'react-router-dom';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

// const app = (
    
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>
// )
ReactDOM.render( 
    <Router>
        <App />
    </Router>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
