const db = require("./connection");

const createTodoTable = () => {
  const query = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Todos table created or already exists");
    }
  });
};

createTodoTable();

module.exports;
