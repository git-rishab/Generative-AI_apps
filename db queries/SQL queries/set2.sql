-- Problem 16:
CREATE TABLE Restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    cuisine_type VARCHAR(100),
    average_rating INT,
    location VARCHAR(255),
    delivery_available BOOLEAN
);

-- Problem 17:
insert into Restaurants (name,cuisine_type, average_rating, location)
values ("a","veg",4,"as")

insert into Restaurants (name,cuisine_type, average_rating,location,delivery_available)
values ("b","veg",3,"b",0)

insert into Restaurants (name,cuisine_type, average_rating,location)
values ("a","veg",2,"c")

insert into Restaurants (name,cuisine_type, average_rating, location,delivery_available)
values ("a","veg",5,"d",1)

insert into Restaurants (name,cuisine_type, average_rating, location,delivery_available)
values ("a","veg",0,"e",1)


-- Problem 18:
select * from restaurants
order by average_rating desc;


-- Problem 19:
select * from restaurants
where delivery_available = 1 and average_rating > 4;

-- Problem 20:
select * from restaurants where cuisine_type is null;

-- Problem 21:
select count(*) from restaurants where delivery_available = 1;

-- Problem 22:
select *
from restaurants
where location like "%sagar%"

-- Problem 23:
select avg(average_rating) from restaurants;

-- Problem 24:
select * 
from restaurants
order by average_rating desc
limit 3

-- Problem 25:
delete from restaurants
where id = 3;