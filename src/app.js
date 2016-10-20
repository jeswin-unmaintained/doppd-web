import HomeContainer from "./containers/home";
import DocsContainer from "./containers/docs";
import PricingContainer from "./containers/pricing";
import AboutContainer from "./containers/about";
import SigninContainer from "./containers/signin";

export default {
  get index() {
    return HomeContainer;
  },
  get home() {
    return HomeContainer;
  },
  get docs() {
    return DocsContainer;
  },
  get pricing() {
    return PricingContainer;
  },
  get about() {
    return AboutContainer;
  },
  get signin() {
    return SigninContainer;
  }
}
