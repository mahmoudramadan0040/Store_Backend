/* Replace with your SQL commands */
 
 create table users (
     id serial primary key,
     username varchar(50) not null,
     firstname varchar(50) not null,
     lastname varchar(50) not null,
     email varchar(50) not null unique,
     password varchar(50) not null 
 );
 