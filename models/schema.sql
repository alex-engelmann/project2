DROP DATABASE IF EXISTS high_scoresDB;
CREATE DATABASE high_scoresDB;
USE high_scoresDB

CREATE TABLE scores
(
    id INTEGER
    AUTO_INCREMENT,
    name VARCHAR
    (30),
score INTEGER,
created DATE,
PRIMARY KEY
    (id)
); 