-- PROBLEM 1 :
Create Table Customers (
    id int preimary key not NULL,
    name varchar (10),
    email varchar (20),
    address varchar (30),
    phone_number int (10)
)

-- PROBLEM 2 :
INSERT INTO Customers 
VALUES 
    (1, 'Rishab', 'rishab@gmail.com', 'Dhanbad', '8789704361'),
    (2, 'Anish', 'anish@gmail.com', 'Dhanbad', '8789706361'),
    (3, 'Adnan', 'adnan@gmail.com', 'Dhanbad', '8789754361'),
    (4, 'Rishuu', 'rishuu@gmail.com', 'Dhanbad', '8749704361'),
    (5, 'Abhi', 'abhi3660@gmail.com', 'Dhanbad', '8781704061');


-- PROBLEM 3 :
SELECT * from Customers

-- PROBLEM 4 :
SELECT name, email from Customers

-- PROBLEM 5 :
SELECT * from Customers 
    WHERE id = 3

-- PROBLEM 6 :
SELECT * FROM Customers
    WHERE name LIKE 'A%';

-- PROBLEM 7 :
SELECT * from Customers
    ORDER by name

-- PROBLEM 8 :
UPDATE Customers
    SET address = "Delhi"
    WHERE id = 4

-- PROBLEM 9 : 
SELECT * FROM Customers
    order by id
    LIMIT 3

-- PROBLEM 10 :
DELETE Customers
    WHERE id = 2


-- PROBLEM 11 :
SELECT COUNT(*) as count from Customers

-- PROBLEM 12 :
SELECT * FROM Customers
    ORDER BY id
    OFFSET 2;


-- PROBLEM 13 :
SELECT * from Customers
    WHERE id > 2 and
    name as 'B%'

-- PROBLEM 14 :
SELECT * from Customers
    WHERE id < 3 and
    name as '%s'

-- PROBLEM 15 :
SELECT * from Customers
    WHERE phone_number is NULL