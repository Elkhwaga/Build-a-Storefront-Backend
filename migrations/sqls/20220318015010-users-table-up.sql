CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_digest VARCHAR(255)
)