/* @flow */
import React from "react";

export default class Code extends React.Component {
  getStyle() {
    return {
      div: {
        background: "white",
        padding: "1em 2em",
        fontFamily: "Fira Mono",
        borderRadius: "8px",
        opacity: "0.8",
        width: "640px",
        maxWidth: "100%"
      },
      comment: {
        color: "green"
      },
      namespace: {
        color: "brown"
      },
      function: {
        color: "blue"
      },
      parameters: {
        color: "gray"
      },
      cmdline: {
        color: "brown"
      }
    }
  }

  render() {
    const style = this.getStyle();

    return(
      <div style={style.div}>
        <p>
          <span style={style.comment}>
            //compiles into a database insert
          </span><br />
          <span style={style.namespace}>db.customers.</span><span style={style.function}>push</span><span style={style.parameters}>(cust1)</span>
        </p>
        <p>
          <span style={style.comment}>
            //compiles into a database query
          </span><br />
          <span style={style.namespace}>db.customers.</span><span style={style.function}>filter</span><span style={style.parameters}>(cust => cust.id &lt; 10)</span>
        </p>
        <p>
          <span style={style.comment}>
            //invoke an HTTP service
          </span><br />
          <span style={style.namespace}>cartService.</span><span style={style.function}>addToCart</span><span style={style.parameters}>(item)</span>
        </p>
        <p>
          <span style={style.comment}>
            #Expose your own functions via<br />
            #a radically simpler RPC convention
          </span><br />
          <span style={style.cmdline}>{`curl "http://example.com/sum(x,y)?x=10&y=20"`}</span><br />
          <span style={style.cmdline}>{`curl "http://example.com/svc.kgsToPounds(200)"`}</span>
        </p>
      </div>
    );
  }
}
