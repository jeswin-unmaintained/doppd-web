/* @flow */
import React from "react";

export default class Logo extends React.Component {
  getStyle() {
    return {
      ul: {
        background: "#eee"
      }
    }
  }

  render() {
    const style = this.getStyle();
    return(
      <ul style={style.ul}>
        <li>Docs</li>
        <li>Pricing</li>
        <li>About</li>
        <li>Sign in</li>
      </ul>
    );
  }
}
