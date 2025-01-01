const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// 검색 결과 보기
router.get("/:input", async (req, res) => {
  try {
    const input = req.params.input;
    const sql = `
      SELECT bv.id AS id
           , bv.category AS category
           , bv.title AS title
           , bv.content AS content
           , bv.createdAt AS createdAt
           , bv.updatedAt AS updatedAt
           , uv.id AS userId
           , uv.userName AS userName
           , uv.profileImage AS profileImage
           , uv.grade AS grade
      FROM boardsView bv
      LEFT OUTER JOIN usersView uv ON bv.userId = uv.id
      WHERE uv.userName LIKE ? OR bv.title LIKE ? OR bv.content LIKE ?
    `;

    const [rows, fields] = await db.query(sql, [
      `%${input}%`, // uv.userName
      `%${input}%`, // or bv.title
      `%${input}%` // or bv.content
    ]);

    // 검색 페이징 구현
    const itemsPerPage = 10;
    const page = parseInt(req.params.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currPageRows = rows.slice(startIndex, endIndex);
    const totalPages = Math.ceil(rows.length / itemsPerPage);

    res.json({ currPageRows, totalPages, page });
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
