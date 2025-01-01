const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const categoryFinder = require("../../utils/categoryFinder");
const xss = require("xss");

// 게시글 전체 보기
router.get("/", async (req, res) => {
  try {
    const sql = `
    SELECT b.id AS postId
        , b.category AS category
        , b.title AS title
        , b.content AS content
        , b.createdAt AS createdAt
        , b.updatedAt AS updatedAt
        , u.id AS userId
        , u.userName AS userName
        , u.profileImage AS profileImage
        , u.grade AS grade
        , c.count AS commentCnt
        , l.userId AS likeName
        , t.name AS tagName
        , v.count AS viewCnt
    FROM boardsView b
    LEFT OUTER JOIN usersView u ON b.userId = u.id
    LEFT OUTER JOIN (SELECT category, postId, COUNT(id) AS count FROM comments GROUP BY category, postId) c ON b.id = c.postId AND b.category = c.category
    LEFT OUTER JOIN (SELECT category, postId, GROUP_CONCAT(name) AS name FROM tags GROUP BY category, postId) t ON b.id = t.postId AND b.category = t.category
    LEFT OUTER JOIN (SELECT category, postId, GROUP_CONCAT(userId) AS userId FROM likes GROUP BY category, postId) l ON b.id = l.postId AND b.category = l.category
    LEFT OUTER JOIN views v ON b.id = v.postId AND b.category = v.category
    ORDER BY b.createdAt ASC
    `;
    const [rows, fields] = await db.query(sql);
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 각 메뉴별 페이징된 게시물 보기
router.get("/:category/page/:page", async (req, res) => {
  try {
    const category = categoryFinder(req.params.category);

    const sql = `SELECT * FROM postsView WHERE category = ? ORDER BY createdAt DESC`;

    const [rows, fields] = await db.query(sql, [category]);

    const itemsPerPage = 10;
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
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 해당 게시글 보기
router.get("/:category/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const category = categoryFinder(req.params.category);

    const viewSql = `UPDATE views SET count = count + 1 WHERE postId = ?`;
    const selectSql = `
    SELECT *
    FROM postsView p
    WHERE p.category = ? AND p.postId = ?
    ORDER BY createdAt DESC
    `;
    console.log(selectSql);

    await db.query(viewSql, [postId]);
    const [rows, fields] = await db.query(selectSql, [category, postId]);

    res.json(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 게시글 쓰기
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const title = xss(req.body.title);
    const content = xss(req.body.content);
    const tags = xss(req.body.tags).split("#").slice(1);
    let category = categoryFinder(req.body.category);

    const postSql = `INSERT INTO ${category} (userId, title, content, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, now(), now());`;
    const setSql = `SET @postId = LAST_INSERT_ID()`;
    const viewSql = `INSERT INTO views (postId, category) VALUES (@postId, ?)`;
    const tagSql = `INSERT INTO tags (postId, category, name) VALUES (@postId, ?, ?)`;

    await db.query(`START TRANSACTION;`);
    const [rows, fields] = await db.query(postSql, [
      userId,
      title,
      content,
      category,
    ]);
    await db.query(setSql);
    await db.query(viewSql, [category]);

    for (i = 0; i < tags.length; i++) {
      await db.query(tagSql, [category, tags[i]]);
    }

    await db.query(`COMMIT;`);

    res.json(rows);
  } catch (err) {
    await db.query(`ROLLBACK;`);
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 게시글 수정
router.put("/:category/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    let category = categoryFinder(req.params.category);

    const { userId } = req.body;
    const title = xss(req.body.title);
    const content = xss(req.body.content);
    const tags = xss(req.body.tags).split("#").slice(1);;

    const selectSql = `SELECT * FROM boardsview bv WHERE bv.category = ? AND bv.id = ? AND bv.userId = ?;`;
    const [rows, fields] = await db.query(selectSql, [
      category,
      postId,
      userId,
    ]);
    if (rows.length > 0) {
      const postSql = `UPDATE ${category} SET title = ?, content = ?, updatedAt = NOW() WHERE id = ?`;
      const tagSql = `UPDATE tags SET name = ? WHERE postId = ?`;
      const [rows, fields] = await db.query(postSql, [title, content, postId]);
      for (let key in tags) {
        const [rows, fields] = await db.query(tagSql, [tags[key], postId]);
      }
      res.json(rows);
    }
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// 게시글 삭제
router.delete("/:category/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    let category = categoryFinder(req.params.category);
    const { userId } = req.body;

    const postSql = `DELETE FROM ${category} WHERE category = ? AND id = ?`;

    const [rows, fields] = await db.query(postSql, [category, postId]);

    if (rows > 0) {
      const postSql = `DELETE FROM ${category} WHERE category = ? AND id = ?`;
      const tagSql = `DELETE FROM ${category} WHERE category = ? AND postId = ?`;

      const [rows, fields] = await db.query(postSql, [category, postId]);
      await db.query(tagSql, [category, postId]);

      await db.query(tagSql, [category, postId]);

      res.json(rows);
    }
    res.send(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
