CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(15) DEFAULT 'active',
  user_id bigint REFERENCES users(id)
);