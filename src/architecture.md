Isotropy
===

Isotropy is a set of babel compiler plugins that enable developers to build applications that can run entirely inside the browser during development, and deployed on Node.JS for production.

Isotropy achieves this by translating native JS constructs to equivalent backend tasks.

For example, see how the following function compiles into a database insert:
```
db.customers = [];
function addCustomer(customer) {
  db.customers.push(customer);
}

//Compiles into
async function addCustomer(customer) {
  const collection = await mongodb.getCollection("customers");
  await collection.insert(customer);
}
```

Since we're using basic JS syntax to achieve backend objectives, your entire app will run inside the browser without needing any modification. And for production, Isotropy will recompile your code to run the UI in the browser, and the backend on Node.JS. So unlike typical isomorphic apps, isomorphic properties are not limited to  User Interfaces alone. Even the backend code will run in the browser.

For lack of a better word, we'll call such end-to-end isomorphic applications "Isotropic applications".

This document discusses the specification and architecture of the Isotropy framework and tools. The following examples will discuss a typical Single-Page App (SPA) talking to HTTP services. However, you can use Isotropy for building backends alone, or frontends alone.

Two Environments
---
There are two different environments to which an Isotropic App needs to be compiled.

- Dev Environment: The entire app must run inside the browser. The UI code and HTTP Services code is combined into one or more JS files and loaded on to a Web Page. Isotropy doesn't modify the code in this case because it can already run within the browser.

- Production Environment: This is where Isotropy steps in and compiles your code. Isotropy first splits the code into client and server bundles. Within the client bundle, service method calls are replaced by HTTP invocations (using hte fetch API). In the server bundle, as previously seen, specific array inserts are replaced with database insertion code.


Your first application, the Todo List.
---

```
const db = [];
const db.todos = [];

async function addTodo(description, assignee) {
  db.todos.push({ description, assignee });
}

async function getTodos(assignee) {
  return db.todos.filter(todo => todo.assignee === assignee);
}

async removeTodo(description, assignee) {
  
}
```




The code you write will automatically run inside your





Isotropic applications are written p


Isotropy has two build targets.
a








or on Node.JS.








There are three build targets:
1. Dev (Entire app (ui + services) is inside the webpage)
2. Production UI
3. Production Server

Use Babel and Webpack for build.

A page which hosts the app (index.html).

An entry point for the app (app.js).

app.js imports ui.js and services.js
ui contains all react code.
services contains web services.
