import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './helpers/Html';
import http from 'http';


const app = new Express();
const router = Express.Router();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

router.get('/', function (req, res) {
  console.log("request to subspace hello");
  res.send({ message: "Hi from subspace /api"});
});

router.get('/login', function (req, res) {
  console.log("request to subspace hello");
  res.send({ username: req.query.username, fullname: req.query.username});
});

router.get('/someData', function (req, res) {
  console.log("request to subspace hello");
  res.send({
    results: [
      {id: 1, title: 'hopla 1'},
      {id: 2, title: 'hopla 2'},
      {id: 3, title: 'hopla 3'},
      {id: 4, title: 'hopla 4'}
    ]
  });
});

router.all('*', function (req, res) {
  console.log("request to subspace hello");
  res.status(404);
  res.send({ message: "not found"});
});

// we attach our routes under /api/v1
app.use('/api', router);

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} />)
  );
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
