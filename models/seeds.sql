use high_scoresDB;

CREATE TABLE scores (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  score int NULL,
  PRIMARY KEY (id)
);

INSERT INTO scores
    (name, score)
VALUES
    ("Kelly", 20),
    ("Brian", 30),
    ("Kim", 10),
    ("Shane", 10)
