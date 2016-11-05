/* @flow */
import React from "react";
import Code from "./code";

export default class Billboard extends React.Component {
  getStyle() {
    return {
      div: {
        backgroundImage: "url(https://images.unsplash.com/photo-1451914532720-521f23b7dedb?dpr=1.5&auto=format&fit=crop&w=1500&h=1125&q=80&cs=tinysrgb&crop=)",
        height: "50em",
        marginTop: "-6em",
        paddingTop: "6em",
        backgroundSize: "cover",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      },
      h1: {
        marginTop: "0.3em",
        fontSize: "4em",
        fontWeight: "lighter",
        marginBottom: "0em"
      },
      sub: {
        fontSize: "1em",
        marginTop: "0",
        textAlign: "center"
      },
      p: {
        fontSize: "1.5em",
        maxWidth: "20em",
        textAlign: "center"
      }
    }
  }

  render() {
    const style = this.getStyle();
    return(
      <div style={style.div}>
        <h1 style={style.h1}>Isotropy</h1>
        <p style={style.p}>
          Write your frontend and backend code
          using simple JavaScript constructs.
        </p>
        <p style={style.sub}>
          Isotropy compiles it into real database queries,<br />
          HTTP calls and filesystem writes.
        </p>
        <Code />
        <p>
          Isotropy is Open Source and MIT licensed.
        </p>
      </div>
    );
  }
}
