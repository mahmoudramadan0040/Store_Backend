/* Replace with your SQL commands */

create table orders (
    id serial primary key,
    product_id integer not null,
    user_id integer not null,
    quantity integer not null,
    status varchar(50) not null,
    FOREIGN key (product_id) references product(id) on delete cascade,
    FOREIGN key (user_id) references users(id) on delete cascade
);