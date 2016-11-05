/* @flow */
import React from "react";

export default class SideBar extends React.Component {
  getStyle() {
    fd["ddd"] = "ssss";
    return {
      div: {
      },
      h1: {
        fontSize: "2em",
        fontWeight: "lighter",
        marginTop: "0"
      },
    }
  }

  render() {
    const style = this.getStyle();
    return(
      <div>
        <style dangerouslySetInnerHTML={{
          __html: `
          ul.sidebar {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }

            ul.sidebar > li {
              margin-bottom: 1em
            }

            ul.sidebar > li:last-child {
              border: none;
            }

            ul.sidebar > li a {
              text-decoration: none;
              color: #222;
            }

            li a:hover {
              color: #000
            }
          `
          }}>
        </style>
        <h1 style={style.h1}>
          Documentation
        </h1>
        <ul className="sidebar">
          {
            [
              ["Getting started"],
              ["Create a new project"],
              ["Write a web service"],
            ].map(i =>
              <li>
                <a href={"#" + i[1]}>{i[0]}</a>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}
