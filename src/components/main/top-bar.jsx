/* @flow */
import React from "react";

export default class TopBar extends React.Component {
  render() {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}
