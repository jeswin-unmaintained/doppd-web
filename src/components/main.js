/* @flow */
import React from 'react';

import HomeContainer from "../containers/home";
import DocsContainer from "../containers/docs";
import PricingContainer from "../containers/pricing";
import AboutContainer from "../containers/about";
import SigninContainer from "../containers/signin";

/* Routes */
const routes = makeRoutes([
  { url: `/`, method: "GET", component: HomeContainer },
  { url: `/docs`, method: "GET", component: DocsContainer },
  { url: `/pricing`, method: "GET", component: PricingContainer },
  { url: `/about`, method: "GET", component: AboutContainer },
  { url: `/signin`, method: "GET", component: SigninContainer },
]);

export default class Main extends Component {
  render() {
    
  }
}
