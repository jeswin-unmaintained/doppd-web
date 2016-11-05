/* @flow */
import React from "react";
import SideBar from "./sidebar";
import Content from "./content";

export default class DocsFrame extends React.Component {
  getStyle() {
    return {
      outer: {
        background: "white",
        boxShadow: "0px 0px 22px #666"        
      },
      div: {
        maxWidth: "70em",
        margin: "auto",
        padding: "2em"
      },
      frame: {
        display: "flex"
      }
    }
  }

  render() {
    const style = this.getStyle();
    return(
      <div style={style.outer}>
        <div style={style.div}>
          <div style={style.frame}>
            <SideBar />
            <Content />
          </div>
        </div>
      </div>
    );
  }
}
