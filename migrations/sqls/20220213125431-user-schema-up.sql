/* Replace with your SQL commands */
 create extension if not exists "uuid-ossp";
 create table users (
     id uuid default uuid_generate_v4() primary key,
     username varchar(50) not null,
     firstname varchar(50) not null,
     lastname varchar(50) not null,
     email varchar(50) not null unique,
     password varchar(50) not null 
 );
 