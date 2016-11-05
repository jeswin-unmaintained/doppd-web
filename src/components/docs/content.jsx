/* @flow */
import React from "react";

export default class SideBar extends React.Component {
  getStyle() {
    return {
      div: {
        maxWidth: "50em",
        margin: "auto"
      }
    }
  }

  render() {
    const style = this.getStyle();
    return(
      <div style={style.div}>
        Hello world.
        <p>What is Lorem Ipsum?
        Lorem Ipsum is simply dummy text of the printing and
        </p><p>typesetting industry. Lorem Ipsum has been the industry's standard dummy text
        </p><p>ever since the 1500s, when an unknown printer took a galley of type and
        </p><p>scrambled it to make a type specimen book. It has survived not only five
        </p><p>centuries, but also the leap into electronic typesetting, remaining essentially
        </p><p>unchanged. It was popularised in the 1960s with the release of Letraset sheets
        </p><p>containing Lorem Ipsum passages, and more recently with desktop publishing
        </p><p>software like Aldus PageMaker including versions of Lorem Ipsum.

        Why do we
        </p><p>use it?
        It is a long established fact that a reader will be distracted by the
        </p><p>readable content of a page when looking at its layout. The point of using Lorem
        </p><p>Ipsum is that it has a more-or-less normal distribution of letters, as opposed
        </p><p>to using 'Content here, content here', making it look like readable English.
        </p><p>Many desktop publishing packages and web page editors now use Lorem Ipsum as
        </p><p>their default model text, and a search for 'lorem ipsum' will uncover many web
        </p><p>sites still in their infancy. Various versions have evolved over the years,
        </p><p>sometimes by accident, sometimes on purpose (injected humour and the
        </p><p>like).


        Where does it come from?
        Contrary to popular belief, Lorem Ipsum is
        </p><p>not simply random text. It has roots in a piece of classical Latin literature
        </p><p>from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor
        </p><p>at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
        </p><p>words, consectetur, from a Lorem Ipsum passage, and going through the cites of
        </p><p>the word in classical literature, discovered the undoubtable source. Lorem Ipsum
        </p><p>comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
        </p><p>(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a
        </p><p>treatise on the theory of ethics, very popular during the Renaissance. The first
        </p><p>line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
        </p><p>section 1.10.32.

        The standard chunk of Lorem Ipsum used since the 1500s is
        </p><p>reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de
        </p><p>Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
        </p><p>original form, accompanied by English versions from the 1914 translation by H.
        </p><p>Rackham.
        </p>
      </div>
    );
  }
}
