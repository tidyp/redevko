// Import necessary modules
const express = require("express");
const router = express.Router();
const db = require('../../config/db');

router.get('/:page', async (req, res) => {
  try {
    const sql = `SELECT * FROM teams`;
    const [rows, fields] = await db.query(sql);
    
    const itemsPerPage = 16;
    const page = parseInt(req.params.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currPageRows = rows.slice(startIndex, endIndex);
    const totalPages = Math.ceil(rows.length / itemsPerPage);

    res.json({
      currPageRows,
      totalPages,
      page,
    });

  } catch (err) {
    console.error('Query execution error:', err);
    res.status(500).json('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  console.log('요청');
  try {
    const {
      category,
      title,
      content,
      section,
      members,
      workPosition,
      startDate,
      endDate,
      location,
      userId,
    } = req.body;

    console.log(
      category,
      title,
      content,
      section,
      members,
      workPosition,
      startDate,
      endDate,
      location,
      userId
    );
    const query = `
      INSERT INTO teams (category, title, content, section, members, workPosition, startDate, endDate, location, userId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const result = await db.query(query, [
      category,
      title,
      content,
      section,
      members,
      workPosition,
      startDate,
      endDate,
      location,
      userId,
    ]);

    res.json(result);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
