const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const categoryFinder = require("../../utils/categoryFinder");

// 게시글 좋아요 보기
router.get("/:category/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const category = categoryFinder(req.params.category);
    const sql = `Select * FROM likes WHERE category = ? AND postId = ?`;
    const [rows, fields] = await db.query(sql, [postId]);
    res.send(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 게시글 좋아요 한번 클릭하면 추가, 두번 클릭하면 삭제
router.post("/:category/:postId", async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.params.postId;
    const category = categoryFinder(req.params.category);

    const selectSql = `SELECT * FROM likes WHERE category = ? AND postId = ? AND userId = ?`;

    const [rows, fields] = await db.query(selectSql, [
      category,
      postId,
      userId,
    ]);

    if (rows.length > 0) {
      const deleteSql = `DELETE FROM likes WHERE category = ? AND postId = ? AND userId = ?`;
      await db.query(deleteSql, [category, postId, userId]);
      res.json("좋아요 취소");
    } else {
      const insertSql = `INSERT INTO likes (category, postId, userId) VALUES (?, ?, ?)`;
      await db.query(insertSql, [category, postId, userId]);
      res.json("좋아요");
    }
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
