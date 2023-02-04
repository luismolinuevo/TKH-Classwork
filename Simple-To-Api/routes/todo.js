import express from "express";
import { nanoid } from 'nanoid';

export default function setupTodoRouter(db) {

    const router = express.Router();

    router.get("/", function (_request, response) {
    //The underscore means to ignore the param that's not being used
        response.status(200).json({
        //Set our response to have a status of 200 (OK!) and to respond with JSON
        success: true,
        todos: db.data.todos, //Returns the todos from our DB
        });
    });

  router.post("/", function (request, response) {
    //Push the new todo
    db.data.todos.push({
      id: nanoid(4),
      name: request.body.todo,
    });
    //Save the todo to the "database"
    db.write();
    //Respond with 200 (OK!) and tell the user the request is successful
    response.status(200).json({
      success: true,
    });
  });
  //PUT route
  //edit an existing todo
  //dynamic param :todo will be the id
  router.put("/:todo", function(req, res){
    const todo = req.params.todo
    console.log(todo)
    //take param, find its index in the array of todos, index it and change its value to whatever the user sent in the request
    //find index of todo
    const todoIndex = db.data.todos.findIndex(currentTodo => currentTodo.id === todo)
    db.data.todos[todoIndex].name = req.body.todo;
    db.write();
    res.status(200).json({
      success: true
    })
  })

  router.delete("/:todo", function(req, res){
    const todo = req.params.todo;
    console.log(todo)
    //take param, find its index in the array of todos, index it and change its value to whatever the user sent in the request
    //find index of todo
    const todoIndex = db.data.todos.findIndex(currentTodo => currentTodo.id === todo)
    // db.data.todos[todoIndex].name = req.body.todo;
    response.status(200).json({
      //Set our response to have a status of 200 (OK!) and to respond with JSON
      success: true,
      todos: db.data.todoIndex, //Returns the todos from our DB
    });
  })

  router.get("/:todo", function (request, response) {
    const todo = request.params.todo;

    const currentTodo = db.data.todos.find((todoItem) => todoItem.id === todo);

    response.status(200).json({
      success: true,
      todo: currentTodo,
    });
  });
  
  // router.get("/:todo", function(req, res){
  //   const todo = req.params.todo;
  //   console.log(todo)
  //   //take param, find its index in the array of todos, index it and change its value to whatever the user sent in the request
  //   //find index of todo
  //   const todoIndex = db.data.todos.findIndex(currentTodo => currentTodo.id === todo)
  //   // db.data.todos[todoIndex].name = req.body.todo;
  //   // db.data.todos.splice(todoIndex, 1);
  //   db.write();
  //   // db.delete();
  //   res.status(200).json({
  //     success: true
  //   })
  // })
  return router;
}