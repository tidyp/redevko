const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.get('/', async (req, res) => {
  try {
    const sql = `SELECT * FROM calendars`;
    const [rows, fields] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Query execution error:', err);
    res.status(500).json('Internal Server Error');
  }
});

router.get('/detail/:id', async (req, res) => {
  const id = req.params.id;
  console.log('요청옴');
  try {
    const sql = `SELECT * FROM calendars WHERE id = ?`;
    const [rows, fields] = await db.query(sql, [id]);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Query execution error:', err);
    res.status(500).json('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      category,
      title,
      content,
      section,
      startDate,
      endDate,
      location,
      userId,
    } = req.body;

    const query = `
      INSERT INTO calendars (category, title, content, section, startDate, endDate, location, userId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [rows, fields] = await db.query(query, [
      category,
      title,
      content,
      section,
      startDate,
      endDate,
      location,
      userId,
    ]);

    res.json(rows);
  } catch (err) {
    console.error('Query execution error:', err);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
