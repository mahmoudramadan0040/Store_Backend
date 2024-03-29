/* Replace with your SQL commands */
create Extension if not exists "uuid-ossp";
create table orders (
    id uuid default uuid_generate_v4() primary key,
    -- product_id uuid default uuid_generate_v4() not null,
    user_id uuid default uuid_generate_v4() not null,
    -- quantity integer not null,
    status varchar(50) not null,
    -- FOREIGN key (product_id) references product(id) on delete cascade,
    FOREIGN key (user_id) references users(id) on delete cascade
    
);
/* many to many relationship */
create table order_product(
    id uuid default uuid_generate_v4() primary key,
    order_id uuid default uuid_generate_v4() ,
    product_id uuid default uuid_generate_v4(),
    quantity integer not null,
    FOREIGN key (order_id) references orders(id) on delete cascade,
    FOREIGN key (product_id) references product(id) on delete cascade
);