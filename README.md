 **Simple server for “todo-checklist” application API using Node.js and MongoDB**

Bearer token for authorization is: qwerty

All newly created todos are marked as undone by default (checkMark: false) and can be changed using update (PUT) request. 

You can get all todos from the database using cURL and terminal with the next command:

curl -H 'Accept: application/json' -H "Authorization: Bearer qwerty" http://localhost:3000/api/todo

or you can use Postman app with the next method and source:
GET  http://127.0.0.1:3000/api/todo

Other methods:

'1' addTodo:
- POST http://127.0.0.1:3000/api/todo
- Body -> x-www-form-urlencoded 
- Key "name" required, value length should be between 3 and 50.

'2' removeTodo
- DELETE http://127.0.0.1:3000/api/todo/{todo item _id}

'3' markDone/markUndone
- PUT http://127.0.0.1:3000/api/todo/{todo item _id}

Tests with Mocha framework aren't created, unfortunately. I will try creating them later.

