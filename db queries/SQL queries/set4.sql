-- Problem 36:
select min(fare) as min_fare
from rides;
select max(fare) as max_fare
from rides;

-- Problem 37:
select driver_id,avg(fare) as avg_fare, avg(distance) as avg_distance
from rides
group by driver_id;

-- Problem 38:
select driver_id, sum(rides) as completed_rides
from rides
group by driver_id
where sum(rides) > 5;


-- Problem 39:
select drivers.name
from drivers as d
join rides as r on d.id = r.driver_id

-- Problem 40:
select driver_id,total_earnings
from (
    select driver_id, sum(fare) as total_earnings
    from rides
    group by driver_id
) as subquery
order by total_earnings desc
limit 3;
 


-- Problem 41:
select * 
from rides
where ride_date >= date_sub(current_date, interval 7 day)

-- Problem 42:
select * from rides
where end_location is not null;

-- Problem 43:

-- Problem 44:

-- Problem 45:
alter table rides
add tip decimal(5,2)