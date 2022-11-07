
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

-- Insert the test user accounts
INSERT INTO `SSE-dating-app`.`user` (`_uid`,username,password,created_at,updated_at,email) VALUES
	 ('3497282697691136','Admin1234','3Eg+gKegvZ73HYz5c2c5JA==','2022-11-07 13:35:58','2022-11-07 13:35:58','jack.z.deng@outlook.com'),
	 ('3497284081811456','ZhengjieDeng','3Eg+gKegvZ73HYz5c2c5JA==','2022-11-07 13:46:58','2022-11-07 13:46:58','a1865926@adelaide.edu.au'),
	 ('3497285136678912','testuser','3Eg+gKegvZ73HYz5c2c5JA==','2022-11-07 13:55:20','2022-11-07 13:55:20','a1865926@outlook.com');



