const express = require("express");
const db = require("../../config/db");
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

router.get("/step2", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "userInfo.html"));
});

router.post("/step3", async (req, res) => {
  const userId = uuidv4();
  const userName = req.body.userName;
  const profileImage = req.body.googleImage || req.body.naverImage;
  const interestPosition = req.body.interestPosition;
  const interestArea = req.body.interestArea;
  const selfDescription = req.body.selfDescription;
  const googleId = req.body.googleId || 0;
  const naverId = req.body.naverId || 0;
  const notification = req.body.notification === "ON" ? 1 : 0;

  const sql = `
    INSERT INTO users (id, userName, profileImage, interestPosition, interestArea, selfDescription, createdAt, updatedAt, grade, notification, googleId, naverId)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), 5, ?, (SELECT id FROM usersgoogle WHERE googleId = ?), (SELECT id FROM usersnaver WHERE naverId = ?))
  `;

  try {
    const [rows, fields] = await db.execute(sql, [
      userId,
      userName,
      profileImage,
      interestPosition,
      interestArea,
      selfDescription,
      notification,
      googleId,
      naverId,
    ]);
    res.cookie("uuid", userId, { secure: true });
    res.cookie("userName", userName, { secure: true });
    res.cookie("userImage", profileImage, { secure: true });
    res.json({ uuid: userId, userName: userName, userImage: profileImage });

    // res.redirect("http://localhost:5173");
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/step3", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `SELECT * FROM users u
       LEFT OUTER JOIN usersgoogle g ON u.googleId = g.id
       LEFT OUTER JOIN usersnaver n ON u.naverId = n.id
       WHERE userName = ?`,
      [userName]
    );

    if (rows.length > 0) {
      res.status(400).json({ message: "이미 가입된 회원입니다" });
    } else {
      await db.execute("INSERT INTO users (userName) VALUES (?)", [userName]);
      // res.redirect('http://localhost:5173');
      res.json({ message: "등록완료" });
    }
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
