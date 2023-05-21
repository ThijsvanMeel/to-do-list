const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Maak verbinding met de database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todolist',
});

connection.connect((error) => {
  if (error) {
    console.error('Fout bij het maken van de verbinding met de database:', error);
  } else {
    console.log('Verbonden met de database');
  }
});

// Routes voor CRUD-operaties

// Taak toevoegen
app.post('/todos', (req, res) => {
  const { content, category, done } = req.body;
  const query = `INSERT INTO todos (content, category, done) VALUES (?, ?, ?)`;
  const values = [content, category, done];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Fout bij het toevoegen van de taak:', error);
      res.status(500).json({ error: 'Er is een interne serverfout opgetreden' });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

// Alle taken ophalen
app.get('/todos', (req, res) => {
  const query = `SELECT * FROM todos`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Fout bij het ophalen van de taken:', error);
      res.status(500).json({ error: 'Er is een interne serverfout opgetreden' });
    } else {
      res.json(results);
    }
  });
});

// Taak bijwerken
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { content, category, done } = req.body;
  const query = `UPDATE todos SET content = ?, category = ?, done = ? WHERE id = ?`;
  const values = [content, category, done, id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Fout bij het bijwerken van de taak:', error);
      res.status(500).json({ error: 'Er is een interne serverfout opgetreden' });
    } else {
      res.json({ success: true });
    }
  });
});

// Taak verwijderen
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM todos WHERE id = ?`;

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Fout bij het verwijderen van de taak:', error);
      res.status(500).json({ error: 'Er is een interne serverfout opgetreden' });
    } else {
      res.json({ success: true });
    }
  });
});

// Start de server
app.listen(port, () => {
  console.log(`Server gestart op http://localhost:${port}`);
});
