-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 02, 2022 at 08:48 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `home_listings`
--

-- --------------------------------------------------------

--
-- Table structure for table `homes`
--

DROP TABLE IF EXISTS `homes`;
CREATE TABLE IF NOT EXISTS `homes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) DEFAULT NULL,
  `age` decimal(10,0) DEFAULT NULL,
  `floor_plan` float DEFAULT NULL,
  `bedroom_no` decimal(10,0) DEFAULT NULL,
  `additional_facilities` varchar(255) DEFAULT NULL,
  `have_garden` tinyint(1) DEFAULT NULL,
  `have_parking` tinyint(1) DEFAULT NULL,
  `proximity_facilities` varchar(255) DEFAULT NULL,
  `proximity_mainroad` tinyint(1) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `tax` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `homes`
--

INSERT INTO `homes` (`id`, `location`, `age`, `floor_plan`, `bedroom_no`, `additional_facilities`, `have_garden`, `have_parking`, `proximity_facilities`, `proximity_mainroad`, `value`, `tax`) VALUES
(1, '6543 A Street', '50', 1600, '3', '2', 1, 1, 'Pharmacy, Hospital, School, Library', 1, 200000, 14000),
(2, '1234 B Street', '20', 2020, '4', '3', 1, 1, 'Supermarket', 1, 300000, 21000),
(3, '4545 Aloha Dr', '1', 3000, '5', '4', 1, 1, 'School, Park', 1, 500000, 35000),
(5, '6000 Clearview Cir', '60', 1900, '3', '2', 1, 1, 'School, Park, Library', 1, 190000, 13300);

-- --------------------------------------------------------

--
-- Table structure for table `home_buyer`
--

DROP TABLE IF EXISTS `home_buyer`;
CREATE TABLE IF NOT EXISTS `home_buyer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `home_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `home_id` (`home_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `home_buyer`
--

INSERT INTO `home_buyer` (`id`, `user_id`, `home_id`) VALUES
(1, 3, 3),
(2, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `home_seller`
--

DROP TABLE IF EXISTS `home_seller`;
CREATE TABLE IF NOT EXISTS `home_seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `home_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `home_id` (`home_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `home_seller`
--

INSERT INTO `home_seller` (`id`, `user_id`, `home_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(5, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `email`, `role`) VALUES
(1, 'test1', '5a105e8b9d40e1329780d62ea2265d8a', 'Mike', 'Tran', 'test1@gmail.com', 'seller'),
(2, 'test2', 'ad0234829205b9033196ba818f7a872b', 'Jane', 'Smith', 'test2@gmail.com', 'seller'),
(3, 'test3', '8ad8757baa8564dc136c1e07507f4a98', 'Nike', 'Adidas', 'test3@gmail.com', 'buyer'),
(4, 'admin', '0192023a7bbd73250516f069df18b500', 'admin', 'admin', 'admin@gmail.com', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
