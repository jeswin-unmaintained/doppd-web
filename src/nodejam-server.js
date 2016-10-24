import url from "url";
import querystring from "querystring";
import formidable from "formidable";
import promisify from "nodefunc-promisify";
import * as acorn from "acorn";

const formParse = promisify((req, form, cb) => form.parse(req, cb), { hasMultipleResults: true });

/*
  Parse the general form hello.world.someFn(x, y, 20)
  or hello.world.someProp

  hello.world.someFn(x, y, 20) is this AST:
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

  hello.world.someFn(x, y, 20) is this AST:
  {
    "type": "ExpressionStatement",
    "start": 0,
    "end": 20,
    "expression": {
      "type": "MemberExpression",
      "start": 0,
      "end": 20,
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
        "end": 20,
        "name": "someProp"
      },
      "computed": false
    }
  }
*/
export async function evalRequest(req, app) {
  const parsed = url.parse(req.url);
  const ast = acorn.parse(parsed.pathname.slice(1));

  const expressionStatement = ast.body[0];
  if (expressionStatement.type !== "ExpressionStatement") {
    throw new Error(`Expected ExpressionStatement but got ${expressionStatement.type}.`);
  }

  const queryParams = querystring.parse(parsed.query);
  const [fields, files] = ["POST", "PUT"].includes(req.method.toUpperCase()) ? (await formParse(req, new formidable.IncomingForm())) : [{}, {}];
  const argsDict = { ...queryParams, ...fields, ...files };

  const fnToInvoke = expressionStatement.expression.type === "CallExpression" ? invokeCallExpression :
    expressionStatement.expression.type === "MemberExpression" ? invokeMemberExpression : undefined;

  if (!fnToInvoke) {
    throw new Error(`Expected CallExpression or MemberExpression but got ${expressionStatement.expression.type}.`);
  }

  const result = fnToInvoke(expressionStatement.expression, app, argsDict);
  return result instanceof Promise ? (await result) : result;
}

/*
  Invokes hello.world.someFn(...) with the correct arguments.
  The thisPtr in someFn is set to world.
*/
function invokeCallExpression(callExpression, app, argsDict) {
  const memberExpression = callExpression.callee;
  const functionPath = getPathFromMemberExpression(memberExpression);
  const [fnPtr, thisPtr] = functionPath.reduce(([_fn, _this], item) =>  [_fn[item], _fn], [app, undefined])

  const args = callExpression.arguments.map(a => {
    if (a.type === "Identifier") {
      const arg = argsDict[a.name];
      return typeof arg === "string" ? JSON.parse(arg) : arg;
    } else if (a.type === "Literal") {
      return a.value;
    } else {
      throw new Error(`Expected Identifier or Literal but got ${a.type}`);
    }
  });

  return fnPtr.apply(thisPtr, args)
}

/*
  Gets the property or field hello.world.someProp.
*/
function invokeMemberExpression(memberExpression, app) {
  let exprPath = getPathFromMemberExpression(memberExpression);
  return exprPath.reduce((current, item) => current[item], app);
}

/*
  Converts a nested memberExpression into ["hello", "world", "prop1"]
*/
function getPathFromMemberExpression(expr, acc = []) {
  if (expr.type === "Identifier") {
    acc.push(expr.name);
  } else if (expr.type === "MemberExpression") {
    getPathFromMemberExpression(expr.object, acc);
    acc.push(expr.property.name);
  }
  return acc;
}
