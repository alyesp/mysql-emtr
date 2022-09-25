DROP DATABASE IF EXISTS employeeMG_db;

CREATE DATABASE employeeMG_db;

-- DATABASE SCHEMA CONTAINING THREE TABLES --

CREATE TABLE depatment (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  --hold role title --
  title VARCHAR(30) NOT NULL,
  --hold role salary --
  salary DECIMAL NOT NULL,
  -- to hold refernece to department role --
  department_id INT NOT NULL,
  FOREIGN KEY(department_id) REFERNECES department(id),
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  -- to hold employee first name --
  first_name VARCHAR(30) NOT NULL,
  -- to hold last name -- 
  last_name VARCHAR(30) NOT NULL.
  -- to hole referances to role employee --
  role_id INT NOT NULL,
  FOREIGN KEY(role_id) REFERENCES role(id),
  -- to hold references to another employee -- 
  manager_id INT NOT NULL,
  -- alt FOREIGN KEY(role_id)
  FOREIGN KEY (manager_id) REFERENCES role(id),
  PRIMARY KEY(id)
);