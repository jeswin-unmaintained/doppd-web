import url from "url";
import formidable from "formidable";
import promisify from "nodefunc-promisify";
import * as acorn from "acorn";

const formParse = promisify((req, form) => form.parse(req));

export async function evalRequest(req, app) {
  const parsed = url.parse(req.url);
  const ast = acorn.parse(parsed.pathname.slice(1));
  const parseResult = parseAST(ast);

  if (["POST", "PUT"].includes(req.method.toUpperCase())) {
    var form = new formidable.IncomingForm();
    const [fields, files] = await formParse(req, form);
  } else if (req.method.toUpperCase() === "GET") {
    const args = parseResult.args.map(a =>
      a.type === "Literal" ? a.value :
      a.type === "Identifier" ? getUrlParam(a.name) :
      undefined
    );

    const thisPtr = undefined;
    const fn = parseResult.memberExpressions.reverse().reduce((current, prop) => {
      thisPtr = current;
      return current[prop.name];
    }, app);

    const result = fn.apply(thisPtr, args)

    return result instanceof Promise ? (await result) : result;
  };
}

function getUrlParam(name) {

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
  const expressionStatement = ast.body[0];
  if (expressionStatement.type !== "ExpressionStatement") {
    throw new Error(`Expected ExpressionStatement but received ${expressionStatement.type}.`);
  }

  const callExpression = expressionStatement.expression;
  if (callExpression.type !== "CallExpression") {
    throw new Error(`Expected CallExpression but received ${callExpression.type}.`);
  }

  const memberExpressions = [];
  let memberExpression = callExpression.callee;
  while (memberExpression) {
    memberExpressions.push(memberExpression);
    memberExpression = memberExpression.object;
  }

  const args = callExpression.arguments;

  console.log({ callExpression, memberExpressions, args });
  return { callExpression, memberExpressions, args };
}
