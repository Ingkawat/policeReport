DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_card` varchar(14) NOT NULL UNIQUE,
  `f_name` varchar(250),
  `l_name` varchar(250),
  `password` varchar(250),
  `phonenumber` varchar(250),
  `email` varchar(250),
  PRIMARY KEY (`id_card`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
