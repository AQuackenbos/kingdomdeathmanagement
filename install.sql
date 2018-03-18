/* v1.0 */
CREATE TABLE IF NOT EXISTS `survivors` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`document` TEXT NULL,
	/* v1.1 */
	`campaign_id` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

/* v1.1 */
CREATE TABLE `campaigns` (
	`campaign_id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`description` TEXT NULL,
	PRIMARY KEY (`campaign_id`)
);

CREATE TABLE `users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(100) NOT NULL,
	`password` VARCHAR(100) NOT NULL,
	`role` VARCHAR(50) NOT NULL DEFAULT 'member',
	`reset_token` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `rel_users_campaigns` (
	`user_id` INT(11) NOT NULL,
	`campaign_id` INT(11) NOT NULL,
	PRIMARY KEY (`user_id`, `campaign_id`)
);
