CREATE TABLE IF NOT EXISTS users  (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    complete_name VARCHAR(200), 
    password VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL
);