-- Problem 26:
CREATE TABLE Rides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    driver_id INT,
    passenger_id INT,
    start_location VARCHAR(255),
    end_location VARCHAR(255),
    distance DECIMAL(5,2),
    ride_time DECIMAL(5,2),
    fare DECIMAL(6,2)
);

-- Problem 27:
insert into rides (driver_id,passenger_id, start_location, end_location,distance,ride_time,fare)
values (1,2,"acs","xvc",2,20,12);
insert into rides (driver_id,passenger_id, start_location, end_location,distance,ride_time,fare)
values (1,1,"asd","cxv",3,40,19);
insert into rides (driver_id,passenger_id, start_location, end_location,distance,ride_time,fare)
values (2,3,"asd","vxc",4,20,1);
insert into rides (driver_id,passenger_id, start_location, end_location,distance,ride_time,fare)
values (3,4,"ads","sf",4,40,19);
insert into rides (driver_id,passenger_id, start_location, end_location,distance,ride_time,fare)
values (4,5,"asd","sdf",18,50,26);



-- Problem 28:
select * from rides
order by fare desc; 

-- Problem 29:
select sum(distance) as distance_sum, sum(fare) as fare_sum
from rides;


-- Problem 30:
select avg(ride_time) as ride_time
from rides;

-- Problem 31:
select * from rides
where start_location like "%downtown" or end_location like "%downtown%";


-- Problem 32:
select count(*) as driver_count
from rides
where driver_id=1;


-- Problem 33:
update rides
set fare = 50
where id = 4;

-- Problem 34:
select driver_id, sum(fare) from rides
group by driver_id;

-- Problem 35:
delete from rides 
where id = 2;