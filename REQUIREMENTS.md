# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## Database Schema

```postgresql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_digest VARCHAR(255)
)

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  price integer NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(15) DEFAULT 'active',
  user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES products(id)
);
```

## API Endpoints

### authentication user

- POST "/users/auth"

Send user id and password to get an authentication token.

```
"email": "example@test.com"
"password": "123-->>>>>>>>"
```

### Products

- create `'/products/' [POST]`
- getProducts `'/products/' [GET]`
- index `'products/:id' [GET]`

#### Users

- index `'users/' [GET]`
- create `'users/' [POST]`
- show `'users/:user_id' [GET]` (token required)
- update `'users/:user_id' [PUT]` (token required)
- destroy `'users/:user_id' [DELETE]` (token required)
- authenticate `'users/auth' [POST]` (token required)

#### Orders

- create `''/orders/:userId' [POST]` (token required)
- show `'/orders/:id' [GET]` (token required)
- index `'/orders/' [GET]` (token required)

#### dashboard

- create `''/users-with-orders' [GET]` (token required)
- show `'/products-in-orders'' [GET]` (token required)
- index `'/five-most-expensive' [GET]` (token required)

## Data Shapes

#### ProductSchema

- id?: number;
- name: string;
- price: string;

#### UserSchema

- id?: number;
- user_name: string;
- first_name: string;
- last_name: string;
- email: string;
- password: string;

#### OrderShema

- id: number;
- status: string;
- user_id: number;

### OrderProductSchema

- id: number;
- quantity: number;
- order_id: number;
- product_id: number;

#### API Products

#### Users

- POST "/users/"
Create a new user by sending its user_name, first_name, last_name, email, password.

```
Request Data: { user_name: string, first_name: string, last_name: string, email: string, password: string }
Response Body: { id: number, user_name, first_name: string, last_name: string, email: string, password_digest: string }
```

- GET "/user/all/"
Receive a list of all the users in the database.

```
Response Body: [{ id: number, user_name, first_name: string, last_name: string, email: string, password_digest: string }]
```

- GET "/user/:id/"
Receive a user's details using its id.

```
Response Body: { id: number, user_name, first_name: string, last_name: string, email: string, password_digest: string }
```

- PUT "/user/:id"
Update a user in the database using its id.

```
Request Data: { user_name, first_name: string, last_name: string, email: string, password_digest: string }
Response Body: { id: number, user_name, first_name: string, last_name: string, email: string, password_digest: string }
```

- DELETE "/user/:id/"
Remove a user from the database using its id.

```
Response Body: { id: number, user_name, first_name: string, last_name: string, email: string, password_digest: string }
```

### product

- POST "/product/"
Create a new product by sending its name and price.

```
Request Data: { name: string, price: number }
Response Body: { id: number, name: string, price: number }
```

- GET "/product/"
Receive a list of all the products in the database.

```
Response Body: [{ id: number, name: string, price: number }]
```

- GET "/product/:id/"
Receive details of a product using its id.

```
Response Body: { id: number, name: string, price: number }
```

#### Orders

- GET "/orders/:userId"
Create the system and give it the active state.

```
Request Data: { id: number, user_id: number, status: string }
Response Body: { id: number, user_id: number, status: string }
```

- GET "/order/:id"
return all orders.

```
Response Body: { order_id: number, product_id: number, quantity: number, user_id: number, status: string }
```

- GET "/orders/:id/products"
add products to your order.
- '(id = order_id) == req.param.id'.

```
Response Body: { quantity: number, product_id: number }
Request Body: { order_id: number, quantity: number, product_id: number }
```

### dashboard

- GET "/users-with-orders"
Returns the current users with orders.

```
Request Body: { [first_name: string, last_name: string] }
```

- GET "products-in-orders"
Returns all peoduct in orders.

```
Response Body: { [name: string, price: number, order_id] }
```

- GET "/five-most-expensive"
Return the last five most expensive.

```
Response Body: { [name: string, price: number]}
```
