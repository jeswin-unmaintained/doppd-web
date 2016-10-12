import parse from "parseurl";
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from './react/store/configure-store';
import * as urlActions from "./react/actions/url";

import MainContainer from "./containers/main";

/* Redux stores */
const store = configureStore({ location: "/" });

async function handleRequest(req, res) {
  const evalResult = evalUrl(req);
  const result = evalResult instanceof Promise ? (await evalResult) : evalResult;
  await urlActions.load(result);
}

//Let's go!
const server = http.createServer((req, res) => {
  evalUrl(req).then(result => {

  })


    evalUrl();
    const fn = findHandlerByUrl(req.url);
    const args = getArgsFromUrl(req.url);
    fn({ req, res }, )

    const path = parse(req.url).path;
    urlActions.load(path)(store.dispatch, store.getState)
      .then(() => {
        const content = renderToString(
          <Provider store={store}>
            <MainContainer />
          </Provider>
        );
        res.end(content);
      })
  } catch (ex) {
    if (ex instanceof NotFoundError) {
      res.statusCode = 404;
      res.end("Not found.");
    } else {
      res.statusCode = 500;
      res.end("Something went wrong.");
    }
  }
});

server.listen(process.argv[0] || 8080);
