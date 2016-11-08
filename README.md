Isotropy
===

Isotropy is a framework that enables developers to write backend functionality (such as database querying) using native JavaScript constructs.

For example, see how the following function compiles into a database insert:
```javascript
db.customers = [];

//Note that the function needs to be async.
async function addCustomer(customer) {
  db.customers = db.customers.concat(customer);
}

//Compiles into
async function addCustomer(customer) {
  const collection = await mongodb.getCollection("customers");
  await collection.insert(customer);
}
```

Since we're using basic JS features to achieve backend objectives, your entire app can run inside the browser. That opens up a new possibility; apps that can be developed and debugged entirely inside the browser. Once it is ready for production, Isotropy will recompile your code to run the UI in the browser and the backend on Node.JS.


Your first app
---
Let's test the waters by create a simple app.

First, install isotropy.
```bash
npm install -g isotropy
```

Let's clone an example app from GitHub to get started.
```bash
git clone https://www.github.com/isotropy/simple-todos
```

Switch to the newly created directory
```bash
cd simple-todos
```

The meat of the application is in the file called services.js.
You should see this:
```javascript
const db = [];

//Some defaults.
db.todos = [
  { desc: "Get Milk", assignee: "me" },
  { desc: "Buy Eggs", assignee: "me" }
];

export async function getTodos() {
  return db.todos;
}

export async function getMyTodos() {
  return db.todos.filter(t => t.assignee === "me");
}

export async function addTodo(desc, assignee) {
  db.todos = db.todos.concat({ desc, assignee });
}

export async function updateTodo(desc, assignee, newDesc, newAssignee) {
  const matchingItem = db.todos.find(todo => todo.desc === desc && todo.assignee === assignee);
  db.todos = db.todos.map(todo => todo === matchingItem ? { desc: newDesc, assignee: newAssignee } : todo);
}

export async function deleteTodo(deleted) {
  const matchingItem = db.todos.find(todo => todo.desc === deleted.desc && todo.assignee === deleted.assignee);
  db.todos = db.todos.filter(todo => todo !== matchingItem);
}
```

Run the app now
```bash
isotropy run dev
```
And go to http://localhost:8080

You show be seeing the todo app functioning in your browser.
The simple code that you wrote is running entirely inside the browser, operating on the db.todos array.
There is no persistence mechanism yet, and all changes are lost if you refresh the page.

Let's make it a little more interesting by persisting the data.
Install a mongodb instance. If your mongodb port is not the default, edit the connection parameters in package.json.
```bash
#todo-- config goes here...
```

Now make a server build with
```bash
isotropy run production
```
And go to http://localhost:8080

After adding a bunch of todos, try refreshing the page. You'll notice that the todos are persisting.
There is a new database in Mongodb called todo-service-db and a collection in it called "todos"! Yaay.

Let's look at what Isotropy has done here:
1. Rewrite array operations to database inserts so that they run on the server
2. Make the methods in services.js callable via HTTP
3. Convert calls to services.js from your UI code into HTTP requests.

Now that you know how it works, let's dive into the details.


Database
---
The default isotropy configuration uses the "db." prefix to identify arrays that need to be persisted to the database. This prefix can be configured in package.json (see configuration). By default, Isotropy uses MongoDb as the backend. PostgreSQL backend is coming soon.

Perform a database insert
```javascript
//Insert a single item
db.todos = db.todos.concat({ title, assignee });

//Insert a list of new items
const todosList = [
  { title: "get milk", assignee: "you" },
  { title: "buy eggs", assignee: "you" }
];
db.todos = db.todos.concat(todosList)
```

Perform a database query
```javascript
return db.todos.filter(todo => todo.assignee === assignee);
```

Perform a database update
```javascript
const item = db.todos.find(t => t.assignee === "you");
item.assignee = "me";
```

Perform a database delete
```javascript
//By reassigning the array with only items that match your criteria
//The following statement removed todos which are assigned to you.
db.todos = db.todos.filter(todo => todo.assignee !== "you");
```

Configuration in package.json
```json
{
  "isotropy": {
    "mongodb": {
      "host": "localhost",
      "port": 19027,
      "password": "abcsfdef"
    }
  }
}
```

File System
---
The default isotropy configuration uses the "fs." prefix to identify arrays that need to be persisted to the database. By default, a directory called "data" under the current directory is used as the store. Both the prefix and directory location can be configured in package.json (see configuration). More storage options like Amazon S3 will be added in future.

Create a directory
```javascript
fs.dir1 = {}
```

Write a file inside the directory
```javascript
fs.dir1.file1 = "Hello, world"
```

List all files in the directory
```javascript
const filenames = Object.keys(fs.dir1)
```

Read a file
```javascript
const content = fs.dir1.file1;
```

Create a sub-directory
```javascript
fs.dir1.dir2 = {}
```

Configuration in package.json
```json
{
  "isotropy": {
    "fs": {
      "directory": "data"
    }
  }
}
```


HTTP Services
---
By default, Isotropy compiler for production converts all the methods imported from the backend entry-point file (defaults to services.js) remote HTTP calls. You can change the entry-point filename in package.json (see configuration).

```javascript
const sum = await services.addTwoNumbers(10, 20);
//Gets converted into
const sum = await fetch("http://example.com/addTwoNumbers(10, 20)")

const sum = await services.addTwoNumbers(x, y);
//Gets converted into
const sum = await fetch("http://example.com/addTwoNumbers(x, y)?x=10y=20");
```

Configuration in package.json
```json
{
  "isotropy": {
    "http": {
      "convention": "isotropy"
    }
  }
}
```

Notice the interesting HTTP url convention. That is the Isotropy RPC calling convention. Read on.


Isotropy HTTP services calling convention
---
Isotropy comes with an radically simpler RPC (Remove Procedure Call) convention, that can be used in place of normal HTTP methods. It allows programmers to leave behind the complexities of the HTTP protocol, HTTP methods, cookies etc. Urls look like plain method calls.

Invoke a method
```bash
# returns 30
curl http://www.example.com/addTwoNumbers(10,20)
```

Invoke with parameters
```bash
curl http://www.example.com/addTwoNumbers(x, y)?x=10&y=20
```

Pass full objects as well
```bash
curl http://www.example.com/addTodo({ desc:"bring milk", assignee: "me" })
```

Pass full objects via a parameter
```bash
curl http://www.example.com/addTodo(todo)?todo={ desc:"bring milk", assignee: "me" })
```

Methods are callable via GET or POST and you can use most common Content-Types such as application/x-www-form-urlencoded, multipart/form-data or application/json.

Example of invoking a method via HTTP POST
```bash
curl --data "x=10&y=20" http://www.example.com/addTwoNumbers(x, y)
```

It is not mandatory that you use the Isotropy RPC Calling Convention, but that is the default.
Other mechanisms will be added in future.


Cookies
---
If the server method defines a cookie parameter, the parameter is assigned the value of the cookie that came with the request. Again, the name of this field is configurable in package.json (see configuration).
```javascript
function addTwoNumbers(x, y, cookie) {
  if (cookie.sessionid === "349594") {
    return x + y;
  }
}
```
