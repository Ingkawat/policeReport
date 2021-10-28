DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(14) NOT NULL UNIQUE,
  `f_name` varchar(250),
  `l_name` varchar(250),
  `password` varchar(250),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
