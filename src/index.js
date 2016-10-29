import 'source-map-support/register';
import http from "http";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from 'react-redux';
import evalExpression from "isotropy-server-eval";

import app from "./app";
import MainContainer from "./containers/main";
import configureStore from "./store/configure-store";
import * as containerActions from "./actions/container";

const store = configureStore({});

const template = (html) => `
<html>
  <head>
    <script src="/static/bundle.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/css/base.css"></link>
    <link rel="stylesheet" type="text/css" href="/static/css/fonts.css"></link>
    <link rel="stylesheet" type="text/css" href="/vendor/font-awesome/css/font-awesome.min.css"></link>
  </head>
  <body>
    <div id="container">${html}</div>
  </body>
</html>`;

async function handleRequest(req, res) {
  try {
    const result = await evalExpression(req, app, { default: "index" });

    if (typeof(result) === "function") {
      containerActions.loadComponent(result);
      const content = renderToString(
        <Provider store={store}>
          <MainContainer />
        </Provider>
      );
      res.end(template(content));
    } else if (typeof result === "undefined") {
      res.statusCode = 404;
      res.end("Not found.");
    } else {
      res.end(result)
    }
  } catch (ex) {
    console.log(ex);
    res.statusCode = 500;
    res.end("Something went wrong.");
  }
}

async function init() {
  const server = http.createServer(handleRequest);
  server.listen(8080);
}

init();
