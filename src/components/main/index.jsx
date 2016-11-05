/* @flow */
import React from "react";
import TopBar from "./top-bar";
import Logo from "./logo";
import MainMenu from "./main-menu";

export default class Main extends React.Component {
  getStyle() {
    return {
      div: {
        marginBottom: "6em"
      }
    }
  }

  render() {
    const style = this.getStyle();
    return(
      <div style={style.div}>
        <TopBar>
          <Logo />
          <MainMenu />
        </TopBar>
        <section>
          <this.props.component />
        </section>
      </div>
    );
  }
}
