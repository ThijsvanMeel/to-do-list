import db from "../config/database.js";

//ophalen van todos
export const getTodos = (result) => {
  db.query("SELECT * FROM todo", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

//specifieke todo uit database halen
export const getTodoById = (id, result) => {
  db.query(
    "SELECT * FROM todo WHERE todo_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

//nieuwe todos toevoegen aan de database
export const insertTodo = (data, result) => {
  db.query("INSERT INTO todo SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

//todos updaten in de database
export const updateTodoById = (data, id, result) => {
  db.query(
    "UPDATE todo SET todo_naam = ?, todo_catogorie = ? WHERE todo_id = ?",
    [data.todo_naam, data.todo_catogorie, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// todos verwijderen in de database
export const deleteTodoById = (id, result) => {
  db.query("DELETE FROM todo WHERE todo_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};