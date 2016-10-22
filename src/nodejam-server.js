import url from "url";
import formidable from "formidable";
import promisify from "nodefunc-promisify";
import * as acorn from "acorn";

const formParse = promisify((req, form) => form.parse(req));

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
export async function evalRequest(req, app) {
  const parsed = url.parse(req.url);
  const ast = acorn.parse(parsed.pathname.slice(1));

  const expressionStatement = ast.body[0];
  if (expressionStatement.type !== "ExpressionStatement") {
    throw new Error(`Expected ExpressionStatement but got ${expressionStatement.type}.`);
  }

  const callExpression = expressionStatement.expression;
  if (callExpression.type !== "CallExpression") {
    throw new Error(`Expected CallExpression but got ${callExpression.type}.`);
  }

  const args = callExpression.arguments.map(a =>
    a.type === "Literal" ? a.value :
    a.type === "Identifier" ? getUrlParam(a.name) :
    undefined
  );

  const argDict = {};
  for (let arg of callExpression.arguments) {
    if (arg.type === "Identifier") {
      argDict[arg.name] = getUrlParams()
    }
  }

  if (["POST", "PUT"].includes(req.method.toUpperCase())) {
    var form = new formidable.IncomingForm();
    const [fields, files] = await formParse(req, form);
    for (let f in fields) {
      argDict[f] = fields[f];
    }
    for (let f in files) {
      argDict[f] = files[f];
    }
  } else if (req.method.toUpperCase() === "GET") {
    for ()

  }

  const memberExpression = callExpression.callee;
  let functionPath = getFunctionPath(memberExpression);

  let thisPtr = undefined;
  let fnPtr = app;
  for (let identifier of functionPath) {
    thisPtr = fnPtr;
    fnPtr = fnPtr[identifier];
  }

  const args = callExpression.arguments.map(a => argDict[a.name]);

  const result = fnPtr.apply(thisPtr, args)
  return result instanceof Promise ? (await result) : result;
}

function getFunctionPath(expr, acc = []) {
  if (expr.type === "Identifier") {
    acc.push(expr.name);
  } else if (expr.type === "MemberExpression") {
    getFunctionPath(expr.object, acc);
    acc.push(expr.property.name);
  }
  return acc;
}


function getUrlParam(name) {

}
