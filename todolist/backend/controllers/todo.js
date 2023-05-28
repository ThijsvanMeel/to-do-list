import {
    getTodos,
    getTodoById,
    insertTodo,
    updateTodoById,
    deleteTodoById,
} from "../models/todoModel.js";

// laten zien op het scherm
export const showTodos = (req, res) => {
    getTodos((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  //specifieke todo laten zien op het scherm
  export const showTodoById = (req, res) => {
    getTodoById(req.params.id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  //todo aanmaken
  export const createTodo = (req, res) => {
    const data = req.body;
    insertTodo(data, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  // bewerken
  export const updateTodo = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateTodoById(data, id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  // verwijderen
  export const deleteTodo = (req, res) => {
    const id = req.params.id;
    deleteTodoById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };