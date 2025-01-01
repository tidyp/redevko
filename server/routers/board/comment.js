const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const categoryFinder = require("../../utils/categoryFinder");

// 전체 댓글 보기
router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM comments ORDER BY createdAt ASC`;
    const [rows, fields] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 메뉴별 댓글 목록 보기
router.get("/:category/:postId", async (req, res) => {
  try {
    let category = categoryFinder(req.params.category);
    const postId = req.params.postId;

    const sql = `
    SELECT c.category
        , c.postId AS postId
        , c.id AS commentId
        , c.mainId AS mainId
        , c.content AS content
        , c.createdAt AS createdAt
        , c.updatedAt AS updatedAt
        , uv.id AS userId
        , uv.userName AS userName
        , uv.profileImage AS profileImage
        , uv.grade AS grade
    FROM comments c
    LEFT OUTER JOIN usersView uv ON c.userId = uv.id
    WHERE c.category = ? AND c.postId = ?
    ORDER BY c.category, c.postId, c.id, c.mainId, c.createdAt ASC
    `;

    const [rows, fields] = await db.query(sql, [category, postId]);

    // const itemsPerPage = 10;
    // const page = parseInt(req.params.page) || 1;

    // const startIndex = (page - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;

    // const currPageRows = rows.slice(startIndex, endIndex);
    // const totalPages = Math.ceil(rows.length / itemsPerPage);

    res.json({ rows });
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 댓글 작성
router.post("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const mainId = commentId || 0;
    const { userId, content, postId } = req.body;
    let category = categoryFinder(req.body.category);

    const sql = `INSERT INTO comments (mainId, content, createdAt, updatedAt, category, userId, postId) VALUES (?, ?, NOW(), NOW(), ?, ?, ?)`;

    const result = await db.query(sql, [
      mainId,
      content,
      category,
      userId,
      postId,
    ]);

    res.json(result);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 댓글 수정
router.put("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const { userId, content } = req.body;
    const updatedAt = new Date();

    const selectSql = `SELECT * FROM comments WHERE id = ? AND userId = ?;`;
    const [rows, fields] = await db.query(selectSql, [
      category,
      postId,
      userId,
    ]);

    if (rows > 0) {
      const updateSql = `UPDATE comments SET category = ?, postId = ?, commentId = ?, content = ?, updatedAt = ? WHERE id = ?`;
      const [rows, fields] = await db.query(updateSql, [
        category,
        postId,
        commentId,
        content,
        updatedAt,
        commentId,
      ]);

      res.json(rows);
    }
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 댓글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const sql = `DELETE FROM comments WHERE id = ?`;

    const [rows, fields] = await db.query(sql, [commentId]);

    res.json(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
