# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]


#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]


## Data Shapes
#### Product
-  id --> uuid
-  name --> string
-  price -->number
-  category -->string

#### User
- id -> uuid
- firstName -->string
- lastName -->string
- password -->string
- lastname -->string
- email -->string
#### Orders
- id uuid
- user_id -->uuid
- status -->string
#### order_product
- quantity -->number
- product_id -->uuid
- order_id --> uuid


## create users table  
'create extension if not exists "uuid-ossp";
 create table users (
     id uuid default uuid_generate_v4() primary key,
     username varchar(50) not null,
     firstname varchar(50) not null,
     lastname varchar(50) not null,
     email varchar(50) not null unique,
     password varchar(255) not null 
 );'

## create product table 
' create extension if not exists "uuid-ossp";
create table product(
    id uuid default uuid_generate_v4() primary key,
    prod_name varchar(50) not null,
    price integer not null ,
    category varchar(50) not null
);'
## create orders table

'create table orders (
    id uuid default uuid_generate_v4() primary key,
    -- product_id uuid default uuid_generate_v4() not null,
    user_id uuid default uuid_generate_v4() not null,
    -- quantity integer not null,
    status varchar(50) not null,
    -- FOREIGN key (product_id) references product(id) on delete cascade,
    FOREIGN key (user_id) references users(id) on delete cascade
    
);'
## create order_product table 


'create table order_product(
    id uuid default uuid_generate_v4() primary key,
    order_id uuid default uuid_generate_v4() ,
    product_id uuid default uuid_generate_v4(),
    quantity integer not null,
    FOREIGN key (order_id) references orders(id) on delete cascade,
    FOREIGN key (product_id) references product(id) on delete cascade
);
'