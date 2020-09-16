CREATE DATABASE IF NOT EXISTS delilahr;

use delilahr;

CREATE TABLE IF NOT EXISTS users 
(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(200) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS products
(
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(100) NOT NULL,
  price FLOAT NOT NULL,
  description VARCHAR(200) NOT NULL,
  item VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS orderStatus
(
  orderStatus_id INT PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(100) NOT NULL
 );
 
 
CREATE TABLE IF NOT EXISTS orders
(
	order_id INT PRIMARY KEY AUTO_INCREMENT,
	userName INT NOT NULL,
	dateT DATETIME NOT NULL DEFAULT NOW(), 
	status INT NOT NULL DEFAULT 1,
	payType VARCHAR(100) NOT NULL,
	total FLOAT NOT NULL,
	FOREIGN KEY (userName) REFERENCES users(user_id),
	CONSTRAINT FOREIGN KEY (status) REFERENCES orderStatus(orderStatus_id)
);


CREATE TABLE IF NOT EXISTS ordersDetails
(
  ordersDetails_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product) REFERENCES products (product_id)
);	 




-------------PRODUCTS VALUES-------------

SELECT * FROM products

INSERT INTO products VALUES
(
	NULL, 
	"American Breakfast", 
	320, 
	"eggs, toasts, bacon, butter and jam, cofee, orange juice", 
	"AmeBreak"
),
(
    NULL, 
	"Cheese Burger", 
	350, 
	"delicious classic Cheese burger", 
	"ChBur"

),
(
    NULL, 
	"Sandwich veggie", 
	250, 
	"herbed goat cheese spread, pickled radishes, roasted peppers, avocado, and red onion", 
	"sandVeg"

),
(
    NULL, 
	"Smoked Salmon Bagel", 
	380, 
	"1 bagel half, layer cucumber, smoked salmon, red onion, and capers", 
	"salBag"

)
;


-------------ORDERSTATUS VALUES-------------

SELECT * FROM orderStatus

INSERT INTO orderStatus VALUES
  (
    NULL,
    "new"
  ),
  (
    NULL,
    "confirmed"
  ),
  (
    NULL,
    "processing"
  ),
  (
    NULL,
    "on the way"
  ),
  (
    NULL,
    "delivered"
  ),
  (
    NULL,
    "canceled"
  );

-------------