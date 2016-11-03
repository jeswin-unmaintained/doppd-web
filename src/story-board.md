Home
====

Menu
----
- Docs
- Pricing
- Download
- About
- Sign in


Installation
---

Install it via npm
```
npm install isotropy
```

Create a new app
```
isotropy new
```

Run the app
```
npm start
# go to localhost:8080
```

You can see more options
```
isotropy help
```



Your first Web Service
---
Our first goal is to create a web service called celciusToFahrenheit(c);

Let's start by modifying the app you created earlier.
Open the file called services.js and paste the following code.
```
function celciusToFahrenheit(celcius) {
  return (celcius * (9/5)) + 32;
}
```

Now paste this into your browser's address bar
```
http://localhost:8080/celciusToFahrenheit(100)
```

You might have already noticed something interesting. Isotropy doesn't really
care about HTTP verbs and methods. To invoke a function just call it via the url.


Simplifying HTTP
---





Storing data
---
Let's create a Todo List. We need a addTodo().
```
function addTodo(taskDescription) {
  db.todos.push
}
```














A fundamental rethink of how apps and services are built.

Build full-fledged apps with simple JavaScript syntax.
Forget protocols, calling conventions, databases and APIs.

Deploy your first Service in 10 seconds.
Copy and paste this into your browser.
```
https://e443.nodejam.com/feetToMeters = (feet) => `${feet} feet is ${0.3048 * feet} meters.`
```

Now call it, by putting this in your browser bar
```
https://e443.nodejam.com/feetToMeters(100)
```

How about saving data?

Paste this to create a table
```
https://e443.nodejam.com/todos=[]
```

Add an item
```
https://e443.nodejam.com/todos.push({ description: "Get milk", importance: "high" })
```

Query it
```
https://e443.nodejam.com/todos.filter(t => t.important === "high")
```

Get the drift? [Create account]

Documentation
----
- Todo list
- Blog
- Git Integration


Pricing
====

Free - Limited VM
Micro - $4.99
Medium - $9.99
Large - $19.99
