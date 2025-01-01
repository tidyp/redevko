const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../../config/db");
require("dotenv").config();

// 이메일 찾기
router.get("/info", async (req, res) => {
  const sql = `
    SELECT un.naverEmail, ug.googleEmail
    FROM usersnaver un
    LEFT OUTER JOIN users u ON u.naverId = un.id
    LEFT OUTER JOIN usersgoogle ug ON ug.id = u.googleId
    WHERE un.naverEmail = ? OR ug.googleEmail = ?
  `;

  const googleEmail = req.body.googleEmail;
  const naverEmail = req.body.naverEmail;

  try {
    const [rows, fields] = await db.query(sql, [googleEmail, naverEmail]);
    
    res.json(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  };
});
  
module.exports = router;