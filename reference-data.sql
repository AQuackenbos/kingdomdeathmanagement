-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: kdm
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reference_keywords`
--

DROP TABLE IF EXISTS `reference_keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reference_keywords` (
  `keyword_id` int(11) NOT NULL AUTO_INCREMENT,
  `document` json DEFAULT NULL,
  PRIMARY KEY (`keyword_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference_keywords`
--

LOCK TABLES `reference_keywords` WRITE;
/*!40000 ALTER TABLE `reference_keywords` DISABLE KEYS */;
INSERT INTO `reference_keywords` VALUES (1,'{\"keyword\": \"Cumbersome\", \"description\": \"Spend {|MOVE|} as an additional cost of activating this weapon.\"}'),(2,'{\"keyword\": \"Perfect hit\", \"description\": \"An attack roll result of a lantern 10.\"}'),(3,'{\"keyword\": \"Savage\", \"description\": \"Once per attack, if you critically wound, cause 1 additional wound.  This effect does not apply to impervious hit locations.\"}'),(4,'{\"keyword\": \"Frail\", \"description\": \"When you attempt to wound a super-dense hit location, this weapon breaks.  Archive this card at the end of the attack.\"}'),(5,'{\"keyword\": \"Range\", \"description\": \"Survivors this many or fewer spaces away from a monster may attack with this weapon. Ranged weapons cannot be used if field of view to the monster is blocked (by terrain with the Obstacle rule).\"}'),(6,'{\"keyword\": \"Provoke\", \"description\": \"When you wound with this weapon, gain the [[priority target]] token.\"}'),(7,'{\"keyword\": \"Consume\", \"description\": \"This consumable gear or resources may be ingested by survivors for a listed result. Some are archived after use.\"}'),(8,'{\"keyword\": \"Deadly\", \"description\": \"+1 luck with this weapon.\"}'),(9,'{\"keyword\": \"Paired\", \"description\": \"When you attack, add the speed of a second copy of this weapon from your gear grid.\"}'),(10,'{\"keyword\": \"Accessory\", \"description\": \"You may wear this in addition to 1 armor at this hit location.\"}'),(11,'{\"keyword\": \"Slow\", \"description\": \"Slow weapons always have an attack speed of 1. Do not add speed modifiers.\"}'),(12,'{\"keyword\": \"Ammo\", \"description\": \"You must have a weapon of (type) in your gear grid to activate this.\"}'),(13,'{\"keyword\": \"Reach\", \"description\": \"May attack from the range described.\"}'),(14,'{\"keyword\": \"Arrival\", \"description\": \"At the start of the showdown.\"}');
/*!40000 ALTER TABLE `reference_keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reference_locations`
--

DROP TABLE IF EXISTS `reference_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reference_locations` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `document` json DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference_locations`
--

LOCK TABLES `reference_locations` WRITE;
/*!40000 ALTER TABLE `reference_locations` DISABLE KEYS */;
INSERT INTO `reference_locations` VALUES (1,'{\"name\": \"Rare Items\"}'),(2,'{\"name\": \"Lantern Horde\"}'),(3,'{\"name\": \"Organ Grinder\"}'),(4,'{\"name\": \"Catarium\"}'),(5,'{\"name\": \"Skinnery\"}'),(6,'{\"name\": \"Bone Smith\"}'),(7,'{\"name\": \"Leather Worker\"}'),(8,'{\"name\": \"Weapon Crafter\"}');
/*!40000 ALTER TABLE `reference_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reference_items`
--

DROP TABLE IF EXISTS `reference_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reference_items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `document` json DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference_items`
--

LOCK TABLES `reference_items` WRITE;
/*!40000 ALTER TABLE `reference_items` DISABLE KEYS */;
INSERT INTO `reference_items` VALUES (1,'{\"name\": \"Bone Axe\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"axe\", \"bone\"], \"keywords\": [\"Frail\", \"Savage\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"red\"}, \"weapon_stats\": {\"hit\": 6, \"speed\": 2, \"strength\": 3}, \"resource_type\": \"weapon\"}',6),(2,'{\"name\": \"Bone Sword\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"sword\", \"bone\"], \"keywords\": [\"Frail\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"red\"}, \"weapon_stats\": {\"hit\": 6, \"speed\": 2, \"strength\": 2}, \"resource_type\": \"weapon\"}',6),(3,'{\"name\": \"Bone Dagger\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"bone\", \"dagger\"], \"metatype\": \"gear\", \"connections\": {\"top\": \"red\", \"left\": \"red\"}, \"description\": \"On a {{Perfect hit}}, gain +1 survival.\", \"weapon_stats\": {\"hit\": 7, \"speed\": 3, \"strength\": 1}, \"resource_type\": \"weapon\"}',6),(4,'{\"name\": \"Bone Darts\", \"image\": \"\", \"types\": [\"weapon\", \"ranged\", \"thrown\", \"bone\"], \"keywords\": [\"Frail\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"red\"}, \"description\": \"{{Range}}: 6\", \"weapon_stats\": {\"hit\": 7, \"speed\": 1, \"strength\": 3}, \"resource_type\": \"weapon\"}',6),(5,'{\"name\": \"Bone Pickaxe\", \"image\": \"\", \"types\": [\"item\", \"tool\", \"bone\"], \"keywords\": [\"Frail\"], \"metatype\": \"gear\", \"connections\": {\"top\": \"green\"}, \"description\": \"After Hunt phase setup, place the [[Mineral Gathering]] event on any hunt space.\", \"weapon_stats\": {\"hit\": 8, \"speed\": 1, \"strength\": 2}, \"resource_type\": \"tool\"}',6),(6,'{\"name\": \"Bone Sickle\", \"image\": \"\", \"types\": [\"item\", \"tool\", \"bone\"], \"keywords\": [\"Frail\"], \"metatype\": \"gear\", \"connections\": {\"top\": \"green\"}, \"description\": \"After Hunt phase setup, place the [[Herb Gathering]] event on any hunt space.\", \"weapon_stats\": {\"hit\": 8, \"speed\": 2, \"strength\": 1}, \"resource_type\": \"tool\"}',6),(7,'{\"name\": \"Monster Grease\", \"image\": \"\", \"types\": [\"item\", \"consumable\", \"soluble\", \"stinky\"], \"bonuses\": [{\"stats\": {\"evasion\": 1}}, {\"stats\": {\"evasion\": 1}, \"requires\": {\"boxes\": {\"green\": 3}}}], \"metatype\": \"gear\", \"connections\": {\"left\": \"green\"}}',3),(8,'{\"name\": \"Cat Gut Bow\", \"image\": \"\", \"types\": [\"weapon\", \"ranged\", \"bow\", \"two-handed\"], \"keywords\": [\"Cumbersome\"], \"metatype\": \"gear\", \"description\": \"{{Range}}: 6\", \"weapon_stats\": {\"hit\": \"7\", \"speed\": \"2\", \"strength\": \"3\"}, \"resource_type\": \"weapon\"}',4),(9,'{\"name\": \"Skull Helm\", \"image\": \"\", \"types\": [\"armor\", \"bone\", \"fragile\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"3\", \"location\": \"head\"}, \"connections\": {\"bottom\": \"red\"}, \"description\": \"When you suffer a severe head injury, the Skull Helm is destroyed.  Archive this card.\", \"resource_type\": \"armor\"}',6),(10,'{\"name\": \"Rawhide Vest\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"rawhide\"], \"bonuses\": [{\"stats\": {\"evasion\": 1}, \"requires\": {\"connections\": {\"red\": 1, \"blue\": 1}}}], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"1\", \"location\": \"body\"}, \"connections\": {\"top\": \"blue\", \"right\": \"red\"}, \"description\": \"\", \"resource_type\": \"armor\"}',5),(11,'{\"name\": \"Rawhide Headband\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"rawhide\"], \"bonuses\": [{\"desc\": \"{|ACTION|}: Reveal the top 2 [[AI Cards]].  Place them back on top of the deck in any order.\", \"requires\": {\"connections\": {\"blue\": 1}}, \"long_desc\": true}], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"1\", \"location\": \"head\"}, \"connections\": {\"bottom\": \"blue\"}, \"description\": \"\", \"resource_type\": \"armor\"}',5),(12,'{\"name\": \"Rawhide Drum\", \"image\": \"\", \"types\": [\"item\", \"rawhide\", \"instrument\", \"noisy\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"green\"}, \"description\": \"When you [[depart]], gain +1 insanity.  When a monster performs an [[Intimidate]] action, roll 1d10.  On a 5+, cancel the effects for you and any adjacent non-deaf survivors.\", \"resource_type\": \"instrument\"}',5),(13,'{\"name\": \"Rawhide Boots\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"rawhide\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"1\", \"location\": \"legs\"}, \"description\": \"When you [[depart]], gain +1 survival.\", \"resource_type\": \"armor\"}',5),(14,'{\"name\": \"Rawhide Gloves\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"rawhide\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"1\", \"location\": \"arms\"}, \"connections\": {\"left\": \"red\"}, \"description\": \"When you [[depart]], gain +1 survival.\", \"resource_type\": \"armor\"}',5),(15,'{\"name\": \"Rawhide Pants\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"rawhide\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"1\", \"location\": \"waist\"}, \"description\": \"\", \"resource_type\": \"armor\"}',5),(16,'{\"name\": \"Rawhide Whip\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"whip\", \"rawhide\"], \"keywords\": [\"Provoke\"], \"metatype\": \"gear\", \"description\": \"\", \"weapon_stats\": {\"hit\": \"7\", \"speed\": \"3\", \"strength\": \"1\"}, \"resource_type\": \"weapon\"}',5),(17,'{\"name\": \"Bandages\", \"image\": \"\", \"types\": [\"item\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"blue\"}, \"description\": \"{|ACTION|}: Remove up to 2 bleeding tokens from yourself or an adjacent survivor.\"}',5),(18,'{\"name\": \"Frenzy Drink\", \"image\": \"\", \"types\": [\"item\", \"consumable\", \"fragile\"], \"metatype\": \"gear\", \"description\": \"{|ACTION|} {{Consume}}:  Suffer [[Frenzy]] brain trauma.  Can be used once per showdown.\", \"resource_type\": \"consumable\"}',4),(19,'{\"name\": \"Lion Beast Katar\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"katar\"], \"keywords\": [\"Deadly\", \"Paired\"], \"metatype\": \"gear\", \"description\": \"\", \"weapon_stats\": {\"hit\": \"7\", \"speed\": \"2\", \"strength\": \"3\"}, \"resource_type\": \"weapon\"}',4),(20,'{\"name\": \"Lion Headdress\", \"image\": \"\", \"types\": [\"item\", \"flammable\"], \"keywords\": [\"Accessory\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"1\", \"location\": \"head\"}, \"description\": \"\", \"resource_type\": \"armor\"}',4),(21,'{\"name\": \"Lion Skin Cloak\", \"image\": \"\", \"types\": [\"armor\", \"fur\", \"bone\", \"heavy\", \"flammable\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"0\", \"location\": \"body\"}, \"connections\": {\"right\": \"green\"}, \"description\": \"Reduce damage from every hit suffered by 1, to a minimum of 1.\", \"resource_type\": \"armor\"}',4),(22,'{\"name\": \"Cat Eye Circlet\", \"image\": \"\", \"types\": [\"item\", \"jewelry\", \"other\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"blue\"}, \"description\": \"{|ACTION|}: Reveal the next 3 monster hit locations and put them back in any order.\"}',4),(23,'{\"name\": \"Cat Fang Knife\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"dagger\", \"bone\"], \"bonuses\": [{\"desc\": \"On a {{Perfect hit}}, gain +1 strength token.  When knocked down, remove all your +1 strength tokens.\", \"requires\": {\"boxes\": {\"red\": 3}}, \"long_desc\": true}], \"metatype\": \"gear\", \"connections\": {\"top\": \"red\", \"left\": \"red\", \"right\": \"red\", \"bottom\": \"red\"}, \"description\": \"\", \"weapon_stats\": {\"hit\": \"6\", \"speed\": \"3\", \"strength\": \"2\"}, \"resource_type\": \"weapon\"}',4),(24,'{\"name\": \"Claw Head Arrow\", \"image\": \"\", \"types\": [\"item\", \"ammunition\", \"arrow\"], \"keywords\": [\"Slow\"], \"metatype\": \"gear\", \"description\": \"{{Ammo}} (Bow)\", \"weapon_stats\": {\"hit\": \"6\", \"speed\": \"1\", \"strength\": \"6\"}, \"resource_type\": \"weapon\"}',4),(25,'{\"name\": \"White Lion Boots\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"fur\", \"heavy\"], \"bonuses\": [{\"stats\": {\"movement\": 1}, \"requires\": {\"connections\": {\"red\": 2}}}], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"2\", \"location\": \"legs\"}, \"connections\": {\"right\": \"red\", \"bottom\": \"red\"}, \"description\": \"\", \"resource_type\": \"armor\"}',4),(26,'{\"name\": \"White Lion Coat\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"fur\", \"heavy\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"2\", \"location\": \"body\"}, \"connections\": {\"top\": \"blue\"}, \"description\": \"[[Pounce]]: Spend {|MOVE|} and {|ACTION|} to move 3 spaces in a straight line.  Then, if you moved 3 spaces, activate a melee weapon with +1 strength.\", \"resource_type\": \"armor\"}',4),(27,'{\"name\": \"White Lion Gauntlet\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"fur\", \"heavy\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"2\", \"location\": \"arms\"}, \"description\": \"When you [[Pounce]], gain +1 accuracy for your next attack this turn.\", \"resource_type\": \"armor\"}',4),(28,'{\"name\": \"White Lion Helm\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"fur\", \"heavy\"], \"bonuses\": [{\"desc\": \"{|ACTION|} and 1 survival: Roar.  [[Non-Deaf]] [[Insane]] survivors gain +1 strength until end of round.  All other survivors gain +1 insanity.\", \"requires\": {\"boxes\": {\"blue\": 1}, \"connections\": {\"red\": 1}}, \"long_desc\": true}], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"2\", \"location\": \"head\"}, \"connections\": {\"bottom\": \"red\"}, \"description\": \"\", \"resource_type\": \"armor\"}',4),(29,'{\"name\": \"White Lion Skirt\", \"image\": \"\", \"types\": [\"armor\", \"set\", \"fur\", \"heavy\"], \"metatype\": \"gear\", \"armor_stats\": {\"defense\": \"2\", \"location\": \"waist\"}, \"connections\": {\"left\": \"red\", \"right\": \"red\"}, \"description\": \"\", \"resource_type\": \"armor\"}',4),(30,'{\"name\": \"King Spear\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"spear\", \"heavy\", \"two-handed\"], \"metatype\": \"gear\", \"connections\": {\"right\": \"red\"}, \"description\": \"{{Reach}} [[2]]\", \"weapon_stats\": {\"hit\": \"6\", \"speed\": \"2\", \"strength\": \"3\"}, \"resource_type\": \"weapon\"}',4),(31,'{\"name\": \"Whisker Harp\", \"image\": \"\", \"types\": [\"item\", \"instrument\", \"noisy\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"blue\"}, \"description\": \"{|ACTION|}: Roll 1d10 to strum.  On a result of 7+ (3+ if fighting White Lion), discard 1 [[mood]] currently in play.\", \"resource_type\": \"instrument\"}',4),(32,'{\"name\": \"Monster Tooth Necklace\", \"image\": \"\", \"types\": [\"item\", \"jewelry\", \"bone\"], \"bonuses\": [{\"stats\": {\"strength\": 1}}, {\"stats\": {\"strength\": 1}, \"requires\": {\"boxes\": {\"red\": 2}}}], \"metatype\": \"gear\", \"connections\": {\"right\": \"red\"}, \"description\": \"\"}',3),(33,'{\"name\": \"Fecal Salve\", \"image\": \"\", \"types\": [\"item\", \"balm\", \"stinky\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"blue\"}, \"description\": \"When you [[depart]], gain +1 survival.<br />\\r\\n{|ACTION|}: You are not a [[threat]] until you attack.  If you have the [[priority target]] token, remove it.\"}',3),(34,'{\"name\": \"Dried Acanthus\", \"image\": \"\", \"types\": [\"item\", \"herb\", \"consumable\"], \"metatype\": \"gear\", \"description\": \"When you [[depart]], gain +2 survival.  When you suffer a severe injury, ignore it and archive this card instead.\", \"resource_type\": \"consumable\"}',3),(35,'{\"name\": \"Lucky Charm\", \"image\": \"\", \"types\": [\"item\", \"jewelry\"], \"bonuses\": [{\"stats\": {\"luck\": 1}, \"requires\": {\"boxes\": {\"blue\": 2}}}], \"metatype\": \"gear\", \"connections\": {\"left\": \"blue\", \"right\": \"blue\"}, \"description\": \"\"}',3),(36,'{\"name\": \"Bone Club\", \"image\": \"\", \"types\": [\"weapon\", \"melee\", \"two-handed\", \"heavy\", \"club\", \"bone\"], \"keywords\": [\"Cumbersome\"], \"metatype\": \"gear\", \"connections\": {\"left\": \"red\", \"right\": \"red\"}, \"description\": \"\", \"weapon_stats\": {\"hit\": \"6\", \"speed\": \"2\", \"strength\": \"5\"}, \"resource_type\": \"weapon\"}',6),(37,'{\"name\": \"Stone Noses\", \"image\": \"\", \"types\": [\"item\", \"jewelry\"], \"metatype\": \"gear\", \"description\": \"On {{Arrival}}, gain +1 survival, +1 insanity.\"}',3);
/*!40000 ALTER TABLE `reference_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-29  0:24:15
