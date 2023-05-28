import mysql from "mysql2"

// database verbinding
const  db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todolist',
  });

  export default db;