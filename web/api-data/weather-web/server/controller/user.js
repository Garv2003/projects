const db = require("../db/db");
const { v4 } = require("uuid");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

module.exports.addPlace = async (req, res) => {
  let { city } = req.body;

  city = city.toLowerCase();

  console.log(city);

  try {
    // create place table if it does not exist
    const createPlaceTable = `CREATE TABLE IF NOT EXISTS
 places(
   id UUID PRIMARY KEY,
   user_id UUID REFERENCES users(id),
   name VARCHAR(100),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 )`;

    await db.query(createPlaceTable);

    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      req.user.email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const place = await db.query(
      "SELECT * FROM places WHERE name = $1 AND user_id = $2",
      [city, user.rows[0].id]
    );

    if (place.rows.length > 0) {
      return res.status(400).json({ error: "City already Added" });
    }

    const user_id = user.rows[0].id;

    const newPlace = await db.query(
      "INSERT INTO places (id, user_id, name) VALUES ($1, $2, $3) RETURNING *",
      [v4(), user_id, city]
    );

    return res.status(201).json({ message: "Place added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.deletePlace = async (req, res) => {
  let { city } = req.body;
  city = city.toLowerCase();
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      req.user.email,
    ]);

    const place = await db.query(
      "DELETE FROM places WHERE name = $1 AND user_id = $2",
      [city, user.rows[0].id]
    );

    if (place.rowCount === 0) {
      res.status(400).json({ error: "Place does not exist" });
    }

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// module.exports.uploadProfileImg = async (req, res) => {
//   const file = parser.format(req.file.originalname, req.file.buffer).content;
//   console.log(file);
//   res.status(200).json({ message: "File uploaded successfully" });
// };

// module.exports.deleteProfileImg = async (req, res) => {
//   res.status(200).json({ message: "File deleted successfully" });
// };
