-- Problem 1:
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    address VARCHAR(255),
    phone_number VARCHAR(100)
);

-- Problem 2:
insert into customers (name,email, address, phone_number)
values ("a","a@mail","mumbai","978")

insert into customers (name,email, address)
values ("b","b@mail","mumbai",)

insert into customers (name,email)
values ("c","c@mail");

insert into customers (name,email, address, phone_number)
values ("d","d@mail","mumbai","2324");

insert into customers (name,email, address, phone_number)
values ("e","e@mail","delhi","3421");

-- Problem 3:
select * from customers;

-- Problem 4:
select name, email from customers;

-- Problem 5:

select * from customers where id=3;

--  Problem 6:
SELECT * FROM users WHERE name LIKE "A%";

-- Problem 7:
SELECT name
FROM users
ORDER BY name DESC;

-- Problem 8:
UPDATE users
SET address = "Dhanbad"
Where id = 4;

-- Problem 9:
SELECT name
FROM users
ORDER BY name ASC
LIMIT 3;


-- Problem 10:
DELETE FROM users
where id = 2;

-- Problem 11:
SELECT COUNT(*) from users;

-- Problem 12:
SELECT id
FROM users
ORDER BY id ASC
LIMIT 2, 5;

-- Problem 13:
select * from customers where id > 4 and name like "v%";


-- Problem 14:
select * from customers where id < 4 and name like "%u" ;


-- Problem 15:
select * from customers where phone_number is null;