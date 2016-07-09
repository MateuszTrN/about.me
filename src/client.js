/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import config from './config';
import io from 'socket.io-client';

function initSocket() {
  const socket = io('', {path: '/ws'});
  socket.on('news', (data) => {
    console.log('news', data);
  });
  socket.on('userActionUpdate', (data) => {
    console.log(data);
  });

  return socket;
}

const socket = initSocket();

const client = new ApiClient(config.parse, config.amazonS3, socket);
const dest = document.getElementById('content');
const store = createStore(getRoutes, client);

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router history={browserHistory}>
      {getRoutes(store)}
    </Router>
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    // console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        <Router history={browserHistory}>
          {getRoutes(store)}
        </Router>
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
