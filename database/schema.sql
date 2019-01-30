DROP DATABASE IF EXISTS vendingmachine;

CREATE DATABASE vendingmachine;

\c vendingmachine;

DROP TABLE IF EXISTS balances CASCADE;

-- Project requirements stated this is built for one user. 
--If more users desired, then would change schema and have users table.
CREATE TABLE balances (
  id SERIAL PRIMARY KEY,
  main_user_balance float
);

DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  item_name varchar (50) NOT NULL,
  item_price float NOT NULL,
  item_quantity int NOT NULL
);

INSERT INTO balances (main_user_balance)
  VALUES (5), (10);

INSERT INTO items (item_name, item_price, item_quantity)
  VALUES ('Snickers', 1.50, 5), ('Cheetos', 1.75, 8);