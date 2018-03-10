DROP DATABASE IF EXISTS business_trip;
CREATE DATABASE business_trip;

USE business_trip;

CREATE TABLE budgets(
  id INT NOT NULL AUTO_INCREMENT,
  location VARCHAR(100) NOT NULL,
  category VARCHAR(45) NOT NULL,
  starting_bid INT default 0,
  highest_bid INT default 0,
  PRIMARY KEY (id)
);
