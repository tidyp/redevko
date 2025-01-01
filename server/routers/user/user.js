const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const db = require("../../config/db");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
require("dotenv").config();

// 파일 업로드 폴더 정의 및 정의된 폴더 없을시 자동생성
const uploadPath = ("public/src/profileimages/");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
};

// 파일 업로드를 위한 하수 정의
const upload = multer({
  dest: uploadPath,
  limits: { fileSize: 10 * 512 * 512 }, // 10mb 제한
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("사진 파일만 첨부하세요."), false);
    };

    cb(null, true);
  }
});

// - 최초 회원가입시 정보 post 여기다 하기 (예정)
router.post("/", upload.single("profileImage"), async (req, res) => {
  const userId = uuidv4();
  const userName = req.body.userName;
  const profileImage = req.body.googleImage || req.body.naverImage;
  const interestPosition = req.body.interestPosition;
  const interestArea = req.body.interestArea;
  const selfDescription = req.body.selfDescription;
  const googleId = req.body.googleId || 0;
  const naverId = req.body.naverId || 0;
  // let notification = req.body.notification;

  const sql = `
    INSERT INTO users (id, userName, profileImage, interestPosition, interestArea, selfDescription, createdAt, updatedAt, grade, notification, googleId, naverId)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), 5, 1, (SELECT id FROM usersgoogle WHERE googleId = ?), (SELECT id FROM usersnaver WHERE naverId = ?))
  `;

  try {
    const [rows, fields] = await db.execute(sql, [
      userId,
      userName,
      profileImage,
      interestPosition,
      interestArea,
      selfDescription,
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

// 내 정보 조회
router.get("/:id", async (req, res) => {
  const sql = `SELECT * FROM users u WHERE u.id = ?`;
  const userId = req.params.id;

  try {
    const [row, fields] = await db.query(sql, [userId]);

    res.json({ users: row });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// 내 정보 수정
router.put("/:id", upload.single("profileImage"), async (req, res) => {
  const userId = req.params.id;
  const { userName, interestPosition, interestArea, selfDescription } = req.body;

  if (req.body.path && typeof req.body.path === "string") {
    const oldProfileImage = path.join(__dirname, "public", "src", "profileimages", req.body.path);

    // 이전 프로필파일 제거
    if (oldProfileImage) {
      fs.unlinkSync(oldProfileImage);
    };
  };

  const profileImage = req.file ? req.file.path : null;
  const updateSql = profileImage
    ? "UPDATE users SET userName = ?, profileImage = ?, interestPosition = ?, interestArea = ?, selfDescription = ?, updatedAt = NOW() WHERE id = ?"
    : "UPDATE users SET userName = ?, interestPosition = ?, interestArea = ?, selfDescription = ?, updatedAt = NOW() WHERE id = ?";

  const updateParams = profileImage
    ? [{userName}, profileImage, interestPosition, interestArea, selfDescription, userId]
    : [userName, interestPosition, interestArea, selfDescription, userId];

  await db.query(updateSql, updateParams);
  res.redirect("/");
});

// 회원 탈퇴
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    };

    res.status(200).json({ message: "User deleted successfully" });
  });
});

module.exports = router;
