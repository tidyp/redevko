const express = require("express");
const router = express.Router();
const cron = require("node-cron");

const Parser = require("rss-parser");
const parser = new Parser();

const blogs = require("./blog.json");
const db = require("../../config/db.js");

router.get("/:page", async (req, res) => {
  try {
    const sql = `SELECT * FROM articles ORDER BY createdAt DESC`;
    const [rows, field] = await db.query(sql);

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

const fetchDataAndInsert = async () => {
  // let totalResult = [];
  const fetchTimestamp = new Date();

  for (const [company, blog] of Object.entries(blogs)) {
    try {
      console.log(`Fetching for ${company} from ${blog}`);
      let feed = await parser.parseURL(blog);
      let result = [];

      feed.items.forEach((data) => {
        result.push({
          title: data.title,
          link: data.link,
          pubDate: data.pubDate,
          fetchedAt: fetchTimestamp,
        });
      });

      for (const data of result) {
        const userId = company;
        const title = data.title;
        const link = data.link;
        const category = "articles";
        const pubDate = new Date(data.pubDate);

        try {
          const selectSql = `SELECT * from articles WHERE link = ?`;
          const insertSql = `INSERT INTO articles (userId, title, link, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);`;
          const [rows, field] = await db.query(selectSql, [link]);

          // if (rows[0].link !== link) {
          // if (rows.length < 1) {
          if (!rows || rows.length < 1) {
            await db.query(insertSql, [
              userId,
              title,
              link,
              category,
              pubDate,
              data.fetchedAt,
            ]);
          }
        } catch (err) {
          console.error("Query execution error:", err);
          res.status(500).json("Internal Server Error");
          return;
        }
        // totalResult.push(...result);
      }
    } catch (err) {
      console.error(`Error in ${company}:`, err);
    }
  }
};

// fetchDataAndInsert();

// cron.schedule("0 */12 * * *", () => {
// cron.schedule("*/1 * * * *", () => {
//   fetchDataAndInsert();
// });

module.exports = router;
