-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.6.7-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych drawnobet
CREATE DATABASE IF NOT EXISTS `drawnobet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `drawnobet`;

-- Zrzut struktury tabela drawnobet.bets
CREATE TABLE IF NOT EXISTS `bets` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `event` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bet` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `odd` decimal(5,2) NOT NULL DEFAULT 0.00,
  `bookmaker` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disciplineId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datetime` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `disciplineId` (`disciplineId`),
  CONSTRAINT `FK_bets_disciplines` FOREIGN KEY (`disciplineId`) REFERENCES `disciplines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli drawnobet.bets: ~10 rows (około)
INSERT INTO `bets` (`id`, `event`, `bet`, `odd`, `bookmaker`, `disciplineId`, `datetime`, `status`) VALUES
	('2cde56fb-9802-11ec-bba3-00ff3a8b4250', 'Śląsk Wrocław - Zagłębie Lubin', '1', 1.95, 'Fortuna', '10ee4403-9c7e-11ec-9a8f-00ff3a8b4250', '2022-02-27 10:15:00', 2),
	('7229bcb6-2d12-4b06-b903-911a2ec7b91e', 'PSG - AS Monaco', '1', 1.55, 'Fortuna', '10ee4403-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-19 21:00:00', 2),
	('8c9c72ee-37c5-496a-ad8f-076c248e224a', 'Turów Zgorzelec - Stelmet Zielona Góra', '1', 9.50, 'STS', '10ee3fd8-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-16 22:30:00', 1),
	('91e3ce55-6027-4036-9138-e38e9d3bda02', 'Gerwyn Price - Krzysztof Ratajski', 'Powyżej 9.5 lega', 1.85, 'STS', '10ee438c-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-02 20:00:00', 2),
	('9dcacb04-09ad-4d69-ad53-52ecb2e71138', 'Arsenal - West Ham', '1', 1.78, 'Fortuna', '10ee4403-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-19 16:00:00', 0),
	('a915929b-f271-4722-86fd-97dd5b162af6', 'Real Madrid - PSG', '1', 2.00, 'Fortuna', '10ee4403-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-09 21:00:00', 1),
	('b6fe2795-9802-11ec-bba3-00ff3a8b4250', 'Iga Świątek - Anett Kontaveit', '1', 2.15, 'Unibet', '10ee4319-9c7e-11ec-9a8f-00ff3a8b4250', '2022-02-26 13:00:00', 1),
	('ceb0b1c0-f8c3-46e3-b669-f908bda2b616', 'Rosja - Polska', '2', 2.15, 'Fortuna', '10ee4403-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-25 20:45:00', 3),
	('d8a53dd6-9550-448e-897c-072585d107f0', 'Polska - Argentyna', 'Poniżej 3.5 seta', 2.80, 'Unibet', '10ee4237-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-02 14:35:00', 2),
	('ef38fef4-84ca-4c90-ab04-9d18ee770aba', 'Rafael Nadal - Novak Djokovic', '1', 2.15, 'Unibet', '10ee4319-9c7e-11ec-9a8f-00ff3a8b4250', '2022-03-10 15:45:00', 1);

-- Zrzut struktury tabela drawnobet.disciplines
CREATE TABLE IF NOT EXISTS `disciplines` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `index` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli drawnobet.disciplines: ~5 rows (około)
INSERT INTO `disciplines` (`id`, `name`, `image`, `index`) VALUES
	('10ee3fd8-9c7e-11ec-9a8f-00ff3a8b4250', 'Koszykówka', 'basketball', 2),
	('10ee4237-9c7e-11ec-9a8f-00ff3a8b4250', 'Siatkówka', 'volleyball', 3),
	('10ee4319-9c7e-11ec-9a8f-00ff3a8b4250', 'Tenis', 'tennis', 4),
	('10ee438c-9c7e-11ec-9a8f-00ff3a8b4250', 'Dart', 'darts', 5),
	('10ee4403-9c7e-11ec-9a8f-00ff3a8b4250', 'Piłka nożna', 'football', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
