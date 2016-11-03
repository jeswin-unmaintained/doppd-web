/* @flow */
import React from "react";

export default class Logo extends React.Component {
  getStyle() {
    return {
      ul: {
        listStyle: "none",
        display: "flex",
        position: "absolute",
        right: "50px",
        top: "0px"
      },
      li: {
        margin: "0.5em",
        background: "white",
        padding: "0.3em 1em",
        borderRadius: "3px",
        textTransform: "uppercase",
        opacity: "0.6",
      },
      a: {
        textDecoration: "none"
      }
    }
  }

  render() {
    const style = this.getStyle();
    return(
      <ul style={style.ul}>
      {
        [
          ["Docs", "/docs"],
          ["About", "/about"],
        ].map(i =>
          <li style={style.li}>
            <a style={style.a} href={i[1]}>
              {i[0]}
            </a>
          </li>
        )
      }
      </ul>
    );
  }
}
