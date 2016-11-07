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
        width: "640px",
        maxWidth: "100%"
      },
      brackets: {
        color: "gray"
      },
      cmdline: {
        color: "brown"
      },
      comma: {
        color: "gray"
      },
      comment: {
        color: "gray"
      },
      dot: {
        color: "blue"
      },
      function: {
        color: "blue"
      },
      namespace: {
        color: "brown"
      },
      object: {
        color: "brown"
      },
      operator: {
        color: "blue"
      },
      parameters: {
        color: "brown"
      },
      string: {
        color: "green"
      }
    }
  }

  render() {
    const style = this.getStyle();

    return(
      <div style={style.div}>
        <p>
          <span style={style.comment}>
            //a database insert
          </span><br />
          <span style={style.namespace}>db<span style={style.dot}>.</span>customers<span style={style.dot}>.</span></span><span style={style.function}>push</span><span style={style.brackets}>(</span><span style={style.parameters}>cust1</span><span style={style.brackets}>)</span>
        </p>
        <p>
          <span style={style.comment}>
            //here's a database query
          </span><br />
            <span style={style.namespace}>db<span style={style.dot}>.</span>customers<span style={style.dot}>.</span></span><span style={style.function}>filter</span>
              <span style={style.brackets}>(</span><span style={style.parameters}>cust</span> <span style={style.operator}></span> <span style={style.parameters}>cust</span>
        </p>
        <p>
          <span style={style.comment}>
            //invoke an HTTP service
          </span><br />
          <span style={style.namespace}>cartService.</span><span style={style.function}>addToCart</span><span style={style.parameters}>(item)</span>
        </p>
        <p>
          <span style={style.comment}>
            //Write to a file
          </span><br />
          <span style={style.namespace}>fs</span><span style={style.brackets}>[</span><span style={style.string}>"greet.txt"</span><span style={style.brackets}>]</span><span style={style.operator}>=</span><span style={style.string}>"hello, world"</span>
        </p>
        <p>
          <span style={style.comment}>
            //Read from a file
          </span><br />
          <span style={style.namespace}>fs.</span><span style={style.function}>get</span><span style={style.parameters}>("greet.txt")</span>
        </p>
        <p>
          <span style={style.comment}>
            #Expose your functions via<br />
            #a radically simpler RPC convention
          </span><br />
          <span style={style.cmdline}>{`curl "http://example.com/sum(x,y)?x=10&y=20"`}</span>
        </p>
      </div>
    );
  }
}
