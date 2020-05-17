CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
    products VARCHAR(30) NOT NULL,
    department_id INT(11) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (id),
    KEY department_id (department_id)
)
