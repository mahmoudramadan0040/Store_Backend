/* Replace with your SQL commands */
 create extension if not exists "uuid-ossp";
create table product(
    id uuid default uuid_generate_v4() primary key,
    prod_name varchar(50) not null,
    price integer not null ,
    category varchar(50) not null
);