import isotropy from "isotropy";
import reactPlugin from "isotropy-react-plugin";

import Home from "./components/home";
import Docs from "./components/docs";
import Pricing from "./components/pricing";
import About from "./components/about";
import Signin from "./components/signin";

async init() {
  const plugins = [reactPlugin];

  const routes = [
    { url: `/`, method: "GET", component: Home },
    { url: `/docs`, method: "GET", component: Docs },
    { url: `/pricing`, method: "GET", component: Pricing },
    { url: `/about`, method: "GET", component: About },
    { url: `/signin`, method: "GET", component: Signin },
  ];

  const apps = [{ type: "react", routes, path: "/ui", renderToStaticMarkup: true }];
  const options = { dir: __dirname, router };

  await isotropy(apps, plugins, options);
}
