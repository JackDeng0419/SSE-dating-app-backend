CREATE DATABASE `SSE-dating-app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


-- `SSE-dating-app`.`user` definition

CREATE TABLE `user` (
  `_uid` char(36) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`_uid`),
  UNIQUE KEY `user_UN` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `SSE-dating-app`.user_profile definition

CREATE TABLE `user_profile` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `age` int unsigned DEFAULT NULL,
  `gender` int unsigned DEFAULT NULL,
  `picture` blob,
  `city` varchar(45) DEFAULT NULL,
  `covid_status` int unsigned DEFAULT '0',
  `vaccinated` tinyint(1) DEFAULT '0',
  `nationality` varchar(100) DEFAULT NULL,
  `preferred_language` varchar(100) DEFAULT NULL,
  `birthday` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `ethnicity` varchar(100) DEFAULT NULL,
  `body_type` varchar(100) DEFAULT NULL,
  `height` varchar(100) DEFAULT NULL,
  `weight` varchar(100) DEFAULT NULL,
  `hair_color` varchar(100) DEFAULT NULL,
  `eye_color` varchar(100) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_profile_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`_uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `SSE-dating-app`.user_hobby definition

CREATE TABLE `user_hobby` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sport` tinyint(1) DEFAULT '0' COMMENT '0: false, 1: true',
  `movie` tinyint(1) DEFAULT '0',
  `reading` tinyint(1) DEFAULT '0',
  `dancing` tinyint(1) DEFAULT '0',
  `music` tinyint(1) DEFAULT '0',
  KEY `fk_hobby_id_idx` (`user_id`),
  CONSTRAINT `fk_hobby_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`_uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `SSE-dating-app`.my_like definition

CREATE TABLE `my_like` (
  `from_id` char(36) NOT NULL,
  `to_id` char(36) NOT NULL,
  `like_status` bigint NOT NULL,
  UNIQUE KEY `my_like_UN` (`from_id`,`to_id`),
  KEY `fk_like_id_1_idx` (`from_id`),
  KEY `fk_like_id_2_idx` (`to_id`),
  CONSTRAINT `fk_like_id_1` FOREIGN KEY (`from_id`) REFERENCES `user` (`_uid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_like_id_2` FOREIGN KEY (`to_id`) REFERENCES `user` (`_uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `SSE-dating-app`.`date` definition

CREATE TABLE `date` (
  `_uid` char(36) NOT NULL,
  `from_id` char(36) NOT NULL,
  `to_id` char(36) NOT NULL,
  `date` varchar(26) NOT NULL,
  `location` varchar(45) NOT NULL,
  `mask_required` int unsigned NOT NULL,
  `state` int unsigned NOT NULL COMMENT '0: pending, 1: accepted, 2: rejected, 3: canceled',
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `city` varchar(100) NOT NULL,
  PRIMARY KEY (`_uid`),
  KEY `fk_date_id_1_idx` (`from_id`),
  KEY `fk_date_id_2_idx` (`to_id`),
  CONSTRAINT `fk_date_id_1` FOREIGN KEY (`from_id`) REFERENCES `user` (`_uid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_date_id_2` FOREIGN KEY (`to_id`) REFERENCES `user` (`_uid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `SSE-dating-app`.`user` (`_uid`,username,password,created_at,updated_at,email) VALUES
	 ('3491870103568384','Mike','4QrcOUm6Wau+VuBX8g+IPg==','2022-10-08 16:40:31','2022-10-08 16:40:31','12345@outlook.com'),
	 ('3494006870769664','Jack','dage','2022-10-20 11:42:01','2022-10-20 11:42:01','12345@outlook.com'),
	 ('3494007225188352','Alice','age','2022-10-20 11:44:50','2022-10-20 11:44:50','12345@outlook.com'),
	 ('3494007753670656','Bob','age','2022-10-20 11:49:02','2022-10-20 11:49:02','12345@outlook.com'),
	 ('3494010492551168','Alex','aefgw','2022-10-20 12:10:49','2022-10-20 12:10:49','12345@outlook.com'),
	 ('3496574525112320','DZJ','4QrcOUm6Wau+VuBX8g+IPg==','2022-11-03 15:47:55','2022-11-03 15:47:55','jack.z.deng@outlook.com');

INSERT INTO `SSE-dating-app`.user_profile (user_id,first_name,last_name,age,gender,picture,city,covid_status,vaccinated,nationality,preferred_language,birthday,location,ethnicity,body_type,height,weight,hair_color,eye_color,longitude,latitude) VALUES
	 ('3491870103568384','Mike123','awfweafafaweffawf',26,0,NULL,NULL,2,1,'','','2011-01-11','Adelaide SA, Australia','awefwefwef','thinfawef','100','160','','',138.6007456,-34.9284989),
	 ('3494006870769664','awefaef','UOA-Ysuites',20,1,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	 ('3494007225188352','aeg','UOA-Ysuites',18,1,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	 ('3494007753670656','aeg','UOA-Ysuites',18,1,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	 ('3494010492551168','faewfaf','UOA-Ysuites',18,1,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

INSERT INTO `SSE-dating-app`.user_hobby (user_id,sport,movie,reading,dancing,music) VALUES
	 ('3491870103568384',0,1,1,1,1);


INSERT INTO `SSE-dating-app`.`date` (`_uid`,from_id,to_id,`date`,location,mask_required,state,updated_at,created_at,city) VALUES
	 ('3495708229369856','3491870103568384','3494006870769664','2022/Oct/29/21','aefaef',1,3,'2022-10-29 21:03:13','2022-10-29 21:03:13','gfawe'),
	 ('3495708814475264','3491870103568384','3494007225188352','2022/Oct/29/21','awefawf',1,3,'2022-10-29 21:07:51','2022-10-29 21:07:51','afawef'),
	 ('3495708919332864','3494007225188352','3491870103568384','2022/Oct/29/21','aefa',1,2,'2022-10-29 21:08:42','2022-10-29 21:08:42','aefa'),
	 ('3496533146206208','3491870103568384','3494006870769664','','',1,0,'2022-11-03 10:19:03','2022-11-03 10:19:03',''),
	 ('3496533156691968','3491870103568384','3494006870769664','','',0,0,'2022-11-03 10:19:08','2022-11-03 10:19:08',''),
	 ('3496540956000256','3491870103568384','3494010492551168','','',0,0,'2022-11-03 11:21:08','2022-11-03 11:21:08',''),
	 ('3496541102800896','3491870103568384','3494010492551168','','',0,0,'2022-11-03 11:22:17','2022-11-03 11:22:17',''),
	 ('3496541211852800','3491870103568384','3494010492551168','','',0,0,'2022-11-03 11:23:10','2022-11-03 11:23:10',''),
	 ('3496541396402176','3491870103568384','3494010492551168','','',0,0,'2022-11-03 11:24:37','2022-11-03 11:24:37',''),
	 ('3496541893427200','3491870103568384','3494010492551168','','',0,0,'2022-11-03 11:28:34','2022-11-03 11:28:34','');

INSERT INTO `SSE-dating-app`.`date` (`_uid`,from_id,to_id,`date`,location,mask_required,state,updated_at,created_at,city) VALUES
	 ('3496541939564544','3491870103568384','3494010492551168','','',0,0,'2022-11-03 11:28:57','2022-11-03 11:28:57',''),
	 ('3496542063296512','3491870103568384','3494010492551168','2022/Nov/03/00','afwef',1,0,'2022-11-03 11:29:56','2022-11-03 11:29:56','afawe');


INSERT INTO `SSE-dating-app`.my_like (from_id,to_id,like_status) VALUES
	 ('3491870103568384','3494006870769664',1),
	 ('3491870103568384','3494007225188352',2),
	 ('3491870103568384','3494007753670656',0),
	 ('3491870103568384','3494010492551168',1);



