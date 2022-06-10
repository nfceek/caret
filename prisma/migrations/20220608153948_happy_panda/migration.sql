
DROP TABLE IF EXISTS `carrots`;
CREATE TABLE IF NOT EXISTS `carrots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `caretword` varchar(100) NOT NULL,
  `available` tinyint(10) NOT NULL DEFAULT '0',
  `business` int(10) DEFAULT '0',
  `premium` int(10) DEFAULT '0',
  `banned` tinyint(4) DEFAULT '0',
  `price` int(10) DEFAULT '5',
  `cid` varchar(250) DEFAULT '',
  `privkey` varchar(250) DEFAULT '',
  `timestamp` varchar(100) DEFAULT '',
  `updateinfo` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `plans`;
CREATE TABLE IF NOT EXISTS `plans` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(25) NOT NULL,
  `benefits` varchar(250) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fkwallet` int(11) DEFAULT NULL,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan` int(11) NOT NULL DEFAULT '1',
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '1',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `chain` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '', 
  `account` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `join_date` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `dateupdated` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE IF NOT EXISTS `wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `chain` varchar(25) NOT NULL,
  `wallet` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

