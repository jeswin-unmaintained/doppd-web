import url from "url";
import querystring from "querystring";
import formidable from "formidable";
import promisify from "nodefunc-promisify";
import * as acorn from "acorn";

const formParse = promisify((req, form, cb) => form.parse(req, cb), { hasMultipleResults: true });

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

  const queryParams = querystring.parse(parsed.query);

  const [fields, files] = ["POST", "PUT"].includes(req.method.toUpperCase()) ? (await formParse(req, new formidable.IncomingForm())) : [{}, {}];
  const argsDict = { ...queryParams, ...fields, ...files };

  const memberExpression = callExpression.callee;
  let functionPath = getFunctionPath(memberExpression);

  let thisPtr = undefined;
  let fnPtr = app;
  for (let identifier of functionPath) {
    thisPtr = fnPtr;
    fnPtr = fnPtr[identifier];
  }

  const args = callExpression.arguments.map(a => {
    if (a.type === "Identifier") {
      let arg = argsDict[a.name];
      return typeof arg === "string" ? JSON.parse(arg) : arg;
    } else if (a.type === "Literal") {
      return a.value;
    } else {
      throw new Error(`Expected Identifier or Literal but got ${a.type}`);
    }
  });

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
