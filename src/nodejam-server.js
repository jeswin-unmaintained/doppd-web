import url from "url";
import formidable from "formidable";
import promisify from "nodefunc-promisify";
import * as acorn from "acorn";
import astTypes from "ast-types";

const n = astTypes.namedTypes;
const formParse = promisify((req, form) => form.parse(req));

export async function evalRequest(req, app) {
  const parsed = url.parse(req.url);
  console.log(parsed);
  const ast = acorn.parse(parsed.pathname.slice(1));
  console.log(JSON.stringify(ast, null, 2));
  parseAST(ast);

  if (["POST", "PUT"].includes(req.method.toUpperCase())) {
    var form = new formidable.IncomingForm();
    const [fields, files] = await formParse(req, form);

  } else if (req.method.toUpperCase()) {

  };
}

/*
  Parse the general form hello.world.someFn(x, y, 20)

  Which is this AST:
  {
    "type": "Program",
    "start": 0,
    "end": 28,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 28,
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 28,
          "callee": {
            "type": "MemberExpression",
            "start": 0,
            "end": 18,
            "object": {
              "type": "MemberExpression",
              "start": 0,
              "end": 11,
              "object": {
                "type": "Identifier",
                "start": 0,
                "end": 5,
                "name": "hello"
              },
              "property": {
                "type": "Identifier",
                "start": 6,
                "end": 11,
                "name": "world"
              },
              "computed": false
            },
            "property": {
              "type": "Identifier",
              "start": 12,
              "end": 18,
              "name": "someFn"
            },
            "computed": false
          },
          "arguments": [
            {
              "type": "Identifier",
              "start": 19,
              "end": 20,
              "name": "x"
            },
            {
              "type": "Identifier",
              "start": 22,
              "end": 23,
              "name": "y"
            },
            {
              "type": "Literal",
              "start": 25,
              "end": 27,
              "value": 20,
              "raw": "20"
            }
          ]
        }
      }
    ],
    "sourceType": "module"
  }

*/

function parseAST(ast) {
  astTypes.visit(ast, {
    visitExpressionStatement: function(path) {
      this.traverse(path);
    },

    // This method will be called for any node with .type "MemberExpression":
    visitMemberExpression: function(path) {
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
