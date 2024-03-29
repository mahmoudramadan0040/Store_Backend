# Store_Backend
The database schema and information can be found in the REQUIREMENT.md
## EndPoints
### userEndPoint
  #### GET all user
  > http://localhost:3000/api/users
  #### GET one user
  > http://localhost:3000/api/users/:id
  #### POST authenticate user
  > http://localhost:3000/api/users/auth/
  #### POST create user
  > http://localhost:3000/api/users/

  #### DELETE delete one user
  > http://localhost:3000/api/users/:id
  #### PATCH  update one user
  > http://localhost:3000/api/users/:id
### Product EndPoint
   #### GET get all product
   >  http://localhost:3000/api/product/
   #### GET get one product 
   > http://localhost:3000/api/product/:id
   #### POST create product 
   > http://localhost:3000/api/product/
   #### DELETE delete product
  > http://localhost:3000/api/product/:id
### order EndPoint 
  #### GET get current order 
  > http://localhost:3000/api/order/:id
  #### POST create order 
  > http://localhost:3000/api/product/
## pakages 
### typescript
  > npm i typescript
### express
 > npm i express 
###
 > npm i --save-dev @types/express
### db-migrate
 > npm i -g db-migrate
 ###
 > npm i -g db-migrate-pg
 ###
 > npm i pg
 ###
 > npm i -save-dev @types/pg
### jsonwebtoken
 > npm i jsonwebtoken
 ###
 > npm i --save-dev @types/jsonwebtoken
### morgan 
> npm i morgan
###
> npm i --save-dev morgan
### jasmine 
> npm i jasmine 
###
> npm i --save-dev @types/jasmine


### Setup Database
* connect to default postgres databse as server root user 
> psql -U postgres
* in psql run this to create user 
> CREATE USER mahmoud WITH PASSWORD 'moon'
* in psql run the following 
> CREATE DATABASE Store_dev;
###
> CREATE DATABASE Store_test;
###
* connect to the database and grant all privileges
### grant for Store_dev
 > \c Store_dev
 ###
 > GRANT ALL PREVILEGES ON DATABASE Store_dev TO mahmoud;
### grant for Store_test
 > \c Store_test
 ###
 > GRANT ALL PREVILEGES ON DATABASE Store_test TO mahmoud;
## database schema
![Db_shema_2](https://user-images.githubusercontent.com/95087747/154383729-23744a5f-7f15-4f25-91b2-b7f59e66571f.PNG)


## setup and run 
#### server port
 > http://localhost:3000
#### build
 > npm run build
#### devolopment
> npm run dev
## test run
> npm run test
## ENV varaibles

```
PORT =3000
POSTGRESS_PORT=5432
POSTGRESS_DB=Store_dev
POSTGRESS_DB_TEST=Store_test
POSTGRESS_USER=mahmoud
POSTGRESS_PASSWORD=moon
POSTGRESS_HOST=localhost

NODE_ENVIRONMENT=dev

BYCRPTE_PASS = 123pass

SALT_ROUNDS =10
TOKEN_SECRET ="first_token"
```


## Test result 
![Capture_1](https://user-images.githubusercontent.com/95087747/154823079-d8b92c67-3b2d-4e4c-b12f-bc752a099d59.PNG)
![Capture_2](https://user-images.githubusercontent.com/95087747/154823090-733c871a-39ac-43de-8c99-2d8c6ba40238.PNG)
![Capture_3](https://user-images.githubusercontent.com/95087747/154823091-bb5b6562-b450-4f8d-9d67-458d5be12978.PNG)
![Capture_4](https://user-images.githubusercontent.com/95087747/154823092-021b4701-285b-4be7-984b-70b97b8f1e6a.PNG)












