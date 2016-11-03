/* @flow */
import React from "react";
import TopBar from "./top-bar";
import Logo from "./logo";
import MainMenu from "./main-menu";

export default class Main extends React.Component {
  render() {
    return(
      <div>
        <TopBar>
          <Logo />
          <MainMenu />
        </TopBar>
        <section class="main">
          <this.props.component />
        </section>
      </div>
    );
  }
}
