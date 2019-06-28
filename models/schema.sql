
DROP DATABASE IF EXISTS high_scoresDB;
CREATE DATABASE high_scoresDB;

use high_scoresDB;

CREATE TABLE scores (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  score int NULL,
  PRIMARY KEY (id)
);