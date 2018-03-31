/* v1.0 */
CREATE TABLE IF NOT EXISTS `survivors` (
	`survivor_id` INT(11) NOT NULL AUTO_INCREMENT,
	`document` JSON NULL,
	/* v1.2 */
	`settlement_id` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

/* v1.1 */
CREATE TABLE IF NOT EXISTS `settlements` (
	`settlement_id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`description` TEXT NULL,
	`document` JSON NULL,
	PRIMARY KEY (`settlement_id`)
);

CREATE TABLE IF NOT EXISTS `users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(100) NOT NULL,
	`password` VARCHAR(100) NOT NULL,
	`role` VARCHAR(50) NOT NULL DEFAULT 'member',
	`reset_token` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `settlement_users` (
	`user_id` INT(11) NOT NULL,
	`settlement_id` INT(11) NOT NULL,
	`is_admin` INT(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (`user_id`, `settlement_id`)
);

/* v1.2 */

CREATE TABLE IF NOT EXISTS `reference_items` (
	`item_id` INT(11) NOT NULL,
	`document` JSON NULL,
	PRIMARY KEY (`item_id`)
);

CREATE TABLE IF NOT EXISTS `reference_locations` (
	`location_id` INT(11) NOT NULL,
	`document` JSON NULL,
	PRIMARY KEY (`location_id`)
);

CREATE TABLE IF NOT EXISTS `reference_innovations` (
	`innovation_id` INT(11) NOT NULL,
	`document` JSON NULL,
	PRIMARY KEY (`innovation_id`)
);