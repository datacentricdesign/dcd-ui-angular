// get the dcd sdk for auth and api
const dcd = require('@datacentricdesign/sdk-js');
const path = require('path');
const enableProdMode = require('@angular/core').enableProdMode;

// Express Engine
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
// Import module map for lazy loading
const provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;

// get the app and auth method from the lib
const app = dcd.app;
const checkAuthentication = dcd.checkAuthentication;

// load environment variables from .env file
const dotEnv = require('dotenv');
const findConfig = require('find-config');
dotEnv.config({path: findConfig('.env')});

// if PORT and BASE_URL exists in .env, use them otherwise take 8080 and ''
const PORT = process.env.PORT || 8080;
const baseUrl = process.env.BASE_URL || '';

const express = require('express');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const DIST_FOLDER = path.join(process.cwd(), 'dist');

// Domino for window undefined
const domino = require('domino');
const fs = require('fs');
const template = fs.readFileSync(path.join(DIST_FOLDER, 'dcd-ui-angular', 'index.html')).toString();
const win = domino.createWindow(template);
global['window'] = win;
global['document'] = win.document;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/dcd-ui-angular/main-es5');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'dcd-ui-angular'));

// Server static files from /browser
app.get('*.*', express.static(path.join(DIST_FOLDER, 'dcd-ui-angular'), {
  maxAge: '1y'
}));

// These routes use the Universal engine
app.get(baseUrl + '/', checkAuthentication,
  async (req, res, next) => {
    console.log('baseUrl');
    console.log('token', req['user'].accessToken);
    res.render('index', {req});
  });
// page because the redirection of '/*' crash because there are many other redirection
app.get(baseUrl + '/page/*', checkAuthentication,
  async (req, res, next) => {
    console.log('page');
    res.render('index', {req});
  });


// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}${baseUrl}`);
});
