const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const { v4 } = require("uuid");

module.exports.register = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  // create user table
  const createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
    id UUID PRIMARY KEY,
    fullname VARCHAR(100),
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await db.query(createUserTable);

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user1 = await db.query(
      "INSERT INTO users (id, fullname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [v4(), fullname, username, email, hashedPassword]
    );

    res.status(201).json({ message: "Signed up successfully" });
  } catch (err) {
    res.status(400).json({ error: "Try again" });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid username" });
    } else {
      const valid = await bcrypt.compare(password, user.rows[0].password);
      if (valid) {
        const token = jwt.sign({ email: user.rows[0].email }, "secret", {
          expiresIn: "24h",
        });
        res.json({ message: "Logged in", token: token });
      } else {
        res.status(402).json({ error: "Invalid password" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err.message });
  }
};

module.exports.user = async (req, res) => {
  try {
    const user = await db.query(
      "SELECT id, fullname, username, email FROM users WHERE email = $1",
      [req.user.email]
    );
    const places = await db.query(
      "SELECT name FROM places WHERE user_id = $1",
      [user.rows[0].id]
    );
    user.rows[0].places = places.rows;
    res.json(user.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
