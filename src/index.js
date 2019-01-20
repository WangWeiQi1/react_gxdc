import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import Admin from './admin'
import Router from './router'
// import Test from './test'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

serviceWorker.unregister();