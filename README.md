# Store_Backend

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

## setup and run 
#### server port
 > http://localhost:3000
#### build
 > npm run build
#### devolopment
> npm run dev

## ENV varaibles
PORT =3000
POSTGRESS_PORT=5432
POSTGRESS_DB=Store_dev
POSTGRESS_DB_TEST=Store_test
POSTGRESS_USER=postgres
POSTGRESS_PASSWORD=moon
POSTGRESS_HOST=localhost

NODE_ENVIRONMENT=dev

BYCRPTE_PASS = 123pass

SALT_ROUNDS =10
TOKEN_SECRET ="first_token"

