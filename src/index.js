import { createApp, evalRequest } from "nodejam-server";
import path from "path";
import http from "http";
import React from "react";

import MainContainer from "./containers/main";
import containerActions from "./actions/container";

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
    const result = await evalRequest(req, app);

    if (result instanceof React.Component) {
      const store = configureStore({ component: undefined });
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
    res.statusCode = 500;
    res.end("Something went wrong.");
  }
}

async function init() {
  const app = createApp(path.join(__dirname, "app.js"));
  const server = http.createServer(handleRequest);
  server.listen(8080);
}

init();
