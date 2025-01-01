const express = require("express");
const router = express.Router();
const request = require("request-promise");
const db = require("../../config/db");
require("dotenv").config();

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;
let state = "RANDOM_STATE";

const redirectURI = encodeURI("http://localhost:3000/api/naverAuth/callback");
let api_url = "";

// 회원가입
router.get("/login", function (req, res) {
  api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    client_id +
    "&redirect_uri=" +
    redirectURI +
    "&state=" +
    state;
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
});

router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&redirect_uri=" +
    redirectURI +
    "&code=" +
    code +
    "&state=" +
    state;

  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret
    }
  };
  const result = await request.get(options);
  const token = JSON.parse(result).access_token;

  // 사용자의 네이버 계정 정보
  const info_options = {
    url: "https://openapi.naver.com/v1/nid/me",
    headers: { Authorization: "Bearer " + token },
  };

  const info_result = await request.get(info_options);
  const info_result_json = JSON.parse(info_result).response;

  // 기존 회원 여부 확인 및 신규 회원 가입
  const naverId = info_result_json.id;
  const naverEmail = info_result_json.email;
  const naverImage = info_result_json.profile_image;

  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM usersnaver WHERE naverId = ? OR naverEmail = ?",
      [naverId, naverEmail]
    );

    if (rows[0]) {
      const userSql = `
        SELECT * FROM usersView uv WHERE uv.naverId = ?
      `;
      const [rows, field] = await db.query(userSql, [naverId]);
      
      res.cookie("uuid", rows[0].id, { secure: true });
      res.cookie("userName", rows[0].userName, { secure: true });
      res.cookie("userImage", rows[0].profileImage, { secure: true });
      res.redirect("http://localhost:5173");

    // 없는 회원, 신규 회원가입 + 추가 정보 입력
    } else {
      await db.execute(
        "INSERT INTO usersnaver (naverId, naverEmail, naverImage) VALUES (?, ?, ?)",
        [naverId, naverEmail, naverImage]
      );
      res.cookie("naverId", naverId, { secure: true });
      res.cookie("naverImage", naverImage, { secure: true });
      res.redirect("http://localhost:5173/addinfo");
    };
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ message: "Internal server error" });
  };
});

module.exports = router;
