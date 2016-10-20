import url from "url";
import formidable from "formidable";
import promisify from "nodefunc-promisify";
import * as acorn from "acorn";
import astTypes from "ast-types";

const formParse = promisify((req, form) => form.parse(req));

export async function evalRequest(req, app) {
  const parsed = url.parse(req.url);
  const ast = acorn.parse(parsed.pathname.slice(1));
  parseAST(ast);

  if (["POST", "PUT"].includes(req.method.toUpperCase())) {
    var form = new formidable.IncomingForm();
    const [fields, files] = await formParse(req, form);

  } else if (req.method.toUpperCase()) {

  };
}

function parseAST(ast) {
  astTypes.visit(ast, {
    // This method will be called for any node with .type "MemberExpression":
    visitMemberExpression: function(path) {
      console.log(path);
      // Visitor methods receive a single argument, a NodePath object
      // wrapping the node of interest.
      var node = path.node;

      if (n.Identifier.check(node.object) &&
          node.object.name === "arguments" &&
          n.Identifier.check(node.property)) {
          assert.notStrictEqual(node.property.name, "callee");
      }

      // It's your responsibility to call this.traverse with some
      // NodePath object (usually the one passed into the visitor
      // method) before the visitor method returns, or return false to
      // indicate that the traversal need not continue any further down
      // this subtree.
      this.traverse(path);
    }
  });
}
