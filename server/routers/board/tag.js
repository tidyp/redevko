const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const categoryFinder = require("../../utils/categoryFinder");

// 태그 전체 보기
router.get("/", async (req, res) => {
  try {
    const sql = `Select * FROM tags`;
    const [rows, fields] = await db.query(sql);
    res.send(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 각 메뉴 포스트별 태그 보기
router.get("/:category/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    let category = categoryFinder(req.params.category);

    const sql = `Select * FROM tags WHERE category = ? AND postId = ?`;
    const [rows, fields] = await db.query(sql, [category, postId]);
    res.send(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 태그 수정
router.put("/:category/:postId", async (req, res) => {
  const postId = req.params.postId;
  let category = categoryFinder(req.params.category);
  const tags = req.body.tags;

  const sql = `UPDATE tags SET name = ? WHERE category = ? AND postId = ? AND id = ?`;

  try {
    for (let key in tags) {
      let tagId = key.slice(3);
      const [rows, fields] = await db.query(sql, [tags[key], postId, tagId]);
      res.send(rows);
    }
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 태그 삭제
router.delete("/:category/:postId/:tagId", async (req, res) => {
  const postId = req.params.postId;
  let category = categoryFinder(req.params.category);
  const tagId = req.params.tagId;

  const tagSql = `DELETE FROM tags WHERE category = ? AND postId = ? AND id = ?`;

  try {
    const [rows, fields] = await db.query(sql, [postId, tagId]);
    res.send(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
