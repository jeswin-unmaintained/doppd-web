/* @flow */
import React from "react";
import Billboard from "./billboard";
import DocsFrame from "../docs/docs-frame";

export default class Home extends React.Component {
  render() {
    return(
      <div>
        <Billboard />
        <DocsFrame />
      </div>
    );
  }
}
