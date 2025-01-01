-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: devko
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT 'articles',
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `link` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=398 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `boardsview`
--

DROP TABLE IF EXISTS `boardsview`;
/*!50001 DROP VIEW IF EXISTS `boardsview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `boardsview` AS SELECT 
 1 AS `id`,
 1 AS `category`,
 1 AS `title`,
 1 AS `content`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `userId`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `calendars`
--

DROP TABLE IF EXISTS `calendars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT 'calendars',
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `section` varchar(45) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendars`
--

LOCK TABLES `calendars` WRITE;
/*!40000 ALTER TABLE `calendars` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mainId` int DEFAULT NULL,
  `content` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `postId` int DEFAULT NULL,
  `userId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discuss`
--

DROP TABLE IF EXISTS `discuss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discuss` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT 'discuss',
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discuss`
--

LOCK TABLES `discuss` WRITE;
/*!40000 ALTER TABLE `discuss` DISABLE KEYS */;
/*!40000 ALTER TABLE `discuss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` varchar(64) NOT NULL,
  `userId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `category` varchar(45) DEFAULT NULL,
  `postId` int DEFAULT NULL,
  `userId` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `postsview`
--

DROP TABLE IF EXISTS `postsview`;
/*!50001 DROP VIEW IF EXISTS `postsview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `postsview` AS SELECT 
 1 AS `postId`,
 1 AS `category`,
 1 AS `title`,
 1 AS `content`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `userId`,
 1 AS `userName`,
 1 AS `profileImage`,
 1 AS `grade`,
 1 AS `commentCnt`,
 1 AS `likeName`,
 1 AS `tagName`,
 1 AS `viewCnt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT 'questions',
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `postId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT 'teams',
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `section` text,
  `members` int DEFAULT NULL,
  `workPosition` text,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `location` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `totalwritesview`
--

DROP TABLE IF EXISTS `totalwritesview`;
/*!50001 DROP VIEW IF EXISTS `totalwritesview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `totalwritesview` AS SELECT 
 1 AS `userId`,
 1 AS `userName`,
 1 AS `postCnt`,
 1 AS `commentCnt`,
 1 AS `teamCnt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `profileImage` text,
  `interestPosition` varchar(45) DEFAULT NULL,
  `interestArea` varchar(45) DEFAULT NULL,
  `selfDescription` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `notification` int DEFAULT NULL,
  `googleId` int DEFAULT NULL,
  `naverId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersgoogle`
--

DROP TABLE IF EXISTS `usersgoogle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersgoogle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `googleId` varchar(128) DEFAULT NULL,
  `googleEmail` varchar(128) DEFAULT NULL,
  `googleImage` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `googleId` (`googleId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersgoogle`
--

LOCK TABLES `usersgoogle` WRITE;
/*!40000 ALTER TABLE `usersgoogle` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersgoogle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersnaver`
--

DROP TABLE IF EXISTS `usersnaver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersnaver` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naverId` varchar(128) DEFAULT NULL,
  `naverEmail` varchar(128) DEFAULT NULL,
  `naverImage` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `naverId` (`naverId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersnaver`
--

LOCK TABLES `usersnaver` WRITE;
/*!40000 ALTER TABLE `usersnaver` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersnaver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `usersview`
--

DROP TABLE IF EXISTS `usersview`;
/*!50001 DROP VIEW IF EXISTS `usersview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `usersview` AS SELECT 
 1 AS `id`,
 1 AS `userName`,
 1 AS `profileImage`,
 1 AS `grade`,
 1 AS `googleId`,
 1 AS `googleEmail`,
 1 AS `googleImage`,
 1 AS `naverId`,
 1 AS `naverEmail`,
 1 AS `naverImage`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `count` int DEFAULT '0',
  `category` varchar(45) DEFAULT NULL,
  `postId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `boardsview`
--

/*!50001 DROP VIEW IF EXISTS `boardsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `boardsview` AS select `discuss`.`id` AS `id`,`discuss`.`category` AS `category`,`discuss`.`title` AS `title`,`discuss`.`content` AS `content`,`discuss`.`createdAt` AS `createdAt`,`discuss`.`updatedAt` AS `updatedAt`,`discuss`.`userId` AS `userId` from `discuss` union select `questions`.`id` AS `id`,`questions`.`category` AS `category`,`questions`.`title` AS `title`,`questions`.`content` AS `content`,`questions`.`createdAt` AS `createdAt`,`questions`.`updatedAt` AS `updatedAt`,`questions`.`userId` AS `userId` from `questions` union select `teams`.`id` AS `id`,`teams`.`category` AS `category`,`teams`.`title` AS `title`,`teams`.`content` AS `content`,`teams`.`createdAt` AS `createdAt`,`teams`.`updatedAt` AS `updatedAt`,`teams`.`userId` AS `userId` from `teams` union select `calendars`.`id` AS `id`,`calendars`.`category` AS `category`,`calendars`.`title` AS `title`,`calendars`.`content` AS `content`,`calendars`.`createdAt` AS `createdAt`,`calendars`.`updatedAt` AS `updatedAt`,`calendars`.`userId` AS `userId` from `calendars` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `postsview`
--

/*!50001 DROP VIEW IF EXISTS `postsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `postsview` AS select `b`.`id` AS `postId`,`b`.`category` AS `category`,`b`.`title` AS `title`,`b`.`content` AS `content`,`b`.`createdAt` AS `createdAt`,`b`.`updatedAt` AS `updatedAt`,`u`.`id` AS `userId`,`u`.`userName` AS `userName`,`u`.`profileImage` AS `profileImage`,`u`.`grade` AS `grade`,`c`.`count` AS `commentCnt`,`l`.`userId` AS `likeName`,`t`.`name` AS `tagName`,`v`.`count` AS `viewCnt` from (((((`boardsview` `b` left join `usersview` `u` on((`b`.`userId` = `u`.`id`))) left join (select `comments`.`category` AS `category`,`comments`.`postId` AS `postId`,count(`comments`.`id`) AS `count` from `comments` group by `comments`.`category`,`comments`.`postId`) `c` on(((`b`.`id` = `c`.`postId`) and (`b`.`category` = `c`.`category`)))) left join (select `tags`.`category` AS `category`,`tags`.`postId` AS `postId`,group_concat(`tags`.`name` separator ',') AS `name` from `tags` group by `tags`.`category`,`tags`.`postId`) `t` on(((`b`.`id` = `t`.`postId`) and (`b`.`category` = `t`.`category`)))) left join (select `likes`.`category` AS `category`,`likes`.`postId` AS `postId`,group_concat(`likes`.`userId` separator ',') AS `userId` from `likes` group by `likes`.`category`,`likes`.`postId`) `l` on(((`b`.`id` = `l`.`postId`) and (`b`.`category` = `l`.`category`)))) left join `views` `v` on(((`b`.`id` = `v`.`postId`) and (`b`.`category` = `v`.`category`)))) order by `b`.`createdAt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `totalwritesview`
--

/*!50001 DROP VIEW IF EXISTS `totalwritesview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `totalwritesview` AS select `uv`.`id` AS `userId`,`uv`.`userName` AS `userName`,`bv`.`count` AS `postCnt`,`c`.`count` AS `commentCnt`,`bvt`.`count` AS `teamCnt` from (((`usersview` `uv` left join (select `boardsview`.`userId` AS `userId`,count(0) AS `count` from `boardsview` group by `boardsview`.`userId`) `bv` on((`uv`.`id` = `bv`.`userId`))) left join (select `bv`.`userId` AS `userId`,count(0) AS `count` from `boardsview` `bv` where (`bv`.`category` = 'group') group by `bv`.`userId`) `bvt` on((`uv`.`id` = `bvt`.`userId`))) left join (select `comments`.`userId` AS `userId`,count(0) AS `count` from `comments` group by `comments`.`userId`) `c` on((`uv`.`id` = `c`.`userId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `usersview`
--

/*!50001 DROP VIEW IF EXISTS `usersview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `usersview` AS select `u`.`id` AS `id`,`u`.`userName` AS `userName`,`u`.`profileImage` AS `profileImage`,`u`.`grade` AS `grade`,`ug`.`googleId` AS `googleId`,`ug`.`googleEmail` AS `googleEmail`,`ug`.`googleImage` AS `googleImage`,`un`.`naverId` AS `naverId`,`un`.`naverEmail` AS `naverEmail`,`un`.`naverImage` AS `naverImage` from ((`users` `u` left join `usersgoogle` `ug` on((`u`.`googleId` = `ug`.`id`))) left join `usersnaver` `un` on((`u`.`naverId` = `un`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-07  6:13:36
