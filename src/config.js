require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  app: {
    internalName: 'DemoApp',
    title: 'Demo App',
    description: 'Demo App',
    head: {
      titleTemplate: 'DemoApp: %s',
      meta: [
        {name: 'description', content: 'Demo App'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Demo App'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Demo App'},
        {property: 'og:description', content: 'Demo App'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@DemoApp'},
        {property: 'og:creator', content: '@DemoApp'},
        {property: 'og:title', content: 'Demo App'},
        {property: 'og:description', content: 'Demo App'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
