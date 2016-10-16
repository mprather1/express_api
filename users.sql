DROP DATABASE IF EXISTS api;
CREATE DATABASE api;

\c api;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    age INTEGER
);
  
INSERT INTO users ( name, email, age )
  VALUES ('Mike', 'mprather@example.com', 34);