-- VSCode Mysql 접속: mysql.exe -uroot -p
-- SQL CLI COMMAND: mysql -u root -p devko < createdb.sql

DROP DATABASE IF EXISTS devko;
CREATE DATABASE IF NOT EXISTS devko;
USE devko;

-- USERS 테이블
DROP TABLE IF EXISTS devko.users;
CREATE TABLE IF NOT EXISTS users (
     id VARCHAR(64) PRIMARY KEY,
     userName VARCHAR(45),
     profileImage TEXT,
     interestPosition VARCHAR(45),
     interestArea VARCHAR(45),
     selfDescription VARCHAR(100),
     createdAt DATETIME,
     updatedAt DATETIME,
     grade INT,
     notification INT,
     googleId INT,
     naverId INT
);

SELECT * FROM devko.users;

-- GOOGLE USERS 테이블
DROP TABLE IF EXISTS devko.usersgoogle;
CREATE TABLE IF NOT EXISTS usersgoogle (
     id INT AUTO_INCREMENT PRIMARY KEY,
     googleId VARCHAR(128) UNIQUE,
     googleEmail VARCHAR(128),
     googleImage TEXT
);

SELECT * FROM devko.usersgoogle;

CREATE TABLE IF NOT EXISTS usersnaver (
     id INT AUTO_INCREMENT PRIMARY KEY,
     naverId VARCHAR(128) UNIQUE,
     naverEmail VARCHAR(128),
     naverImage TEXT
);

SELECT * FROM devko.usersnaver;

-- FOLLOWERS 테이블
DROP TABLE IF EXISTS devko.followers;
CREATE TABLE IF NOT EXISTS followers (
    id VARCHAR(64) PRIMARY KEY,
    userId VARCHAR(64)
);

SELECT * FROM devko.followers;

-- COMMENTS 테이블
DROP TABLE IF EXISTS devko.comments;
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    content TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    category VARCHAR(45),
    postId INT,
    userId VARCHAR(64)
);

-- TAGS 테이블
DROP TABLE IF EXISTS devko.tags;
CREATE TABLE IF NOT EXISTS tags (
    name VARCHAR(100),
    category VARCHAR(45),
    postId INT
);

-- LIKES 테이블
DROP TABLE IF EXISTS devko.likes;
CREATE TABLE IF NOT EXISTS likes (
    category VARCHAR(45),
    postId INT,
    userId VARCHAR(64)
);

-- VIEWS 테이블
DROP TABLE IF EXISTS devko.views;
CREATE TABLE IF NOT EXISTS views (
    count INT DEFAULT 0,
    category VARCHAR(45),
    postId INT
);

-- DISCUSS 테이블
DROP TABLE IF EXISTS devko.discuss;
CREATE TABLE IF NOT EXISTS discuss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(45) DEFAULT 'discuss',
    title VARCHAR(100),
    content TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    userId VARCHAR(64)
);

-- Q&A 테이블
DROP TABLE IF EXISTS devko.questions;
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(45) DEFAULT 'questions',
    title VARCHAR(100),
    content TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    userId VARCHAR(64)
);

-- GROUP 테이블
DROP TABLE IF EXISTS devko.teams;
CREATE TABLE IF NOT EXISTS teams  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(45) DEFAULT 'teams',
    title VARCHAR(100),
    content TEXT,
    section TEXT,
    members INT,
    workPosition TEXT,
    startDate DATETIME,
    endDate DATETIME,
    location TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    userId VARCHAR(64)
);

-- EVENT 테이블
DROP TABLE IF EXISTS devko.calendars;
CREATE TABLE IF NOT EXISTS calendars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(45) DEFAULT 'calendars',
    title VARCHAR(100),
    content TEXT,
    section VARCHAR(45),
    startDate DATETIME,
    endDate DATETIME,
    location VARCHAR(45),
    createdAt DATETIME,
    updatedAt DATETIME,
    userId VARCHAR(64)
);

-- ARTICLE 테이블
DROP TABLE IF EXISTS devko.articles;
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(45) DEFAULT 'articles',
    title VARCHAR(100),
    content TEXT,
    link TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    userId VARCHAR(64)
);

-- USERS 테이블 통합
DROP VIEW IF EXISTS devko.usersView;

CREATE VIEW usersView AS 
SELECT u.id AS id
    , u.userName AS userName
    , u.profileImage AS profileImage
    , u.grade AS grade
    , ug.googleId AS googleId
    , ug.googleEmail AS googleEmail
    , ug.googleImage AS googleImage
    , un.naverId AS naverId
    , un.naverEmail AS naverEmail
    , un.naverImage AS naverImage
FROM users u
LEFT OUTER JOIN usersgoogle ug ON u.googleId = ug.id
LEFT OUTER JOIN usersnaver un ON u.naverId = un.id
;

SELECT * FROM usersView;

-- 전체 게시판 통합
DROP VIEW IF EXISTS devko.boardsView;

CREATE VIEW boardsView AS 
(SELECT id, category, title, content, createdAt, updatedAt, userId FROM discuss)
UNION (SELECT id, category, title, content, createdAt, updatedAt, userId FROM questions)
UNION (SELECT id, category, title, content, createdAt, updatedAt, userId FROM teams)
UNION (SELECT id, category, title, content, createdAt, updatedAt, userId FROM calendars)
;

SELECT * FROM boardsView;

-- 게시글 보기
DROP VIEW IF EXISTS devko.postsView;

CREATE VIEW postsView AS 
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
;

SELECT * FROM postsView;

-- 커뮤니티 점수 보기
DROP VIEW IF EXISTS devko.totalwritesView;

CREATE VIEW totalwritesView AS 
SELECT uv.id AS userId,
        uv.userName AS userName,
        bv.count AS postCnt,
        c.count AS commentCnt,
        bvt.count AS teamCnt
FROM usersView uv
LEFT OUTER JOIN (SELECT userId, COUNT(*) AS count FROM boardsView GROUP BY userId) bv ON uv.id = bv.userId
LEFT OUTER JOIN (SELECT userId, COUNT(*) AS count FROM boardsView bv WHERE bv.category = 'group' GROUP BY userId) bvt ON uv.id = bvt.userId
LEFT OUTER JOIN (SELECT userId, COUNT(*) AS count FROM comments GROUP BY userId) c ON uv.id = c.userId
;

SELECT * FROM totalwritesView;

