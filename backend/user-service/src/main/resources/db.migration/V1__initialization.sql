
USE BC142_Seeder;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT,
    name VARCHAR(45),
    email VARCHAR(45),
    password VARCHAR(60),
  	available_credit Decimal(10,2),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cashkick (
    id INT AUTO_INCREMENT,
    name VARCHAR(45),
    maturity_date DATE,
    total_financed DECIMAL(10, 2),
    status VARCHAR(45),
    total_received DECIMAL(10, 2),
    user_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE IF NOT EXISTS payment (
    id INT AUTO_INCREMENT,
    due_date DATE,
    status VARCHAR(45),
    expected_amount DECIMAL(10, 2),
    outstanding_amount DECIMAL(10, 2),
    user_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE IF NOT EXISTS contract (
    id INT AUTO_INCREMENT,
    name VARCHAR(45),
    type VARCHAR(45),
    rate_of_interest DECIMAL(5, 2),
    installment DECIMAL(10, 2),
    term_length INT,
    total_available DECIMAL(15, 2),
    total_financed DECIMAL(15, 2),
    status VARCHAR(45),
    per_payment DECIMAL(10, 2),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS contractCashkickMap (
    cashkick_id INT,
    contract_id INT,
    PRIMARY KEY (cashkick_id, contract_id),
    FOREIGN KEY (cashkick_id) REFERENCES cashkick(id),
    FOREIGN KEY (contract_id) REFERENCES contract(id)
);