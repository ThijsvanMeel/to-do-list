import express from "express";

import {
  showTodos,
  showTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

//alle todos
router.get("/todos", showTodos);

//een todo
router.get("/todos/:id", showTodoById);

// Create Todo
router.post("/todos", createTodo);

// Update Todo
router.put("/todos/:id", updateTodo);

// verwijder todo
router.delete("/todos/:id", deleteTodo);

export default router;