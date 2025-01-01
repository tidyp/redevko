const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT;

// 미들웨어 설정
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(helmet()); // XSS, Data Injection 등의 웹페이지 공격기법 막아주는 역할을 함.

// 라우터 설정
app.use("/api/googleAuth", require("./routers/user/googleAuth"));
app.use("/api/naverAuth", require("./routers/user/naverAuth"));
app.use("/api/additionalInfo", require("./routers/user/additionalInfo"));
app.use("/api/profile", require("./routers/user/profile"));
app.use("/api/find", require("./routers/user/find"));
app.use("/api/user", require("./routers/user/user"));

app.use("/api/chat", require("./routers/chat/chat"));

app.use("/api/post", require("./routers/board/post"));
app.use("/api/tag", require("./routers/board/tag"));
app.use("/api/sidebar", require("./routers/board/sidebar"));
app.use("/api/comment", require("./routers/board/comment"));
app.use("/api/like", require("./routers/board/like"));
app.use("/api/search", require("./routers/board/search"));
app.use("/api/team", require("./routers/board/team"));
app.use("/api/calendar", require("./routers/board/calendar"));

app.use("/api/article", require("./routers/article/article"));


// 서버 설정
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
