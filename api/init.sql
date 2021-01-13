CREATE SCHEMA IF NOT EXISTS `exam` ;

DROP TABLE IF EXISTS `exam`.`news`;

CREATE TABLE `exam`.`news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT(1000) NOT NULL,
  `image` VARCHAR(100) NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`));
  
INSERT INTO `exam`.`news` (`title`, `description`, `date`) VALUES 
('test1', 'text1', '2020-12-19 12:02:00'),
('test2','text2','2020-12-19 12:02:00'),
('test3','text3','2020-12-19 12:02:00');
  
DROP TABLE IF EXISTS `exam`.`comments`;
  
CREATE TABLE `exam`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NOT NULL,
  `author` VARCHAR(45) NOT NULL DEFAULT 'Anonymous',
  `message` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `news_id_idx` (`news_id` ASC) VISIBLE,
  CONSTRAINT `news_id`
    FOREIGN KEY (`news_id`)
    REFERENCES `exam`.`news` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

    
INSERT INTO `exam`.`comments` (`news_id`, `author`, `message`) VALUES
('1', 'dm1', 'some text1'), 
('2','', 'some text2'), 
('1','', 'some text3');