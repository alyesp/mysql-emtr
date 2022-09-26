USE employeeTracker_db;

INSERT INTO department;
(name)

VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role
(title, salary, department_id)

VALUES 
('Sales Lead', 100000, 1),
('Sales Associate' 100000, 1),
('Lead Engineer', 110000, 2),
('Software Engineer', 105000, 2),
('Account Manager', 90000, 3),
('Accountant', 85000, 3),
('Legal Team Lead', 130000, 4),
('Lawyer', 120000, 4);

INSERT employee
(first_name, last_name, role_id, manager_id)

VALUES
('Alyssa', 'Esparza', 1, 2),
('Lauren', 'Ghetian', 2, 1),
('Scott', 'Webb', 3, 4),
('Kris', 'Webb', 4, 3),
('Ryan', 'Minarcin', 5, 6),
('Delaney', 'Hannon', 6, 5),
('Julie', 'Roberts', 7, 8),
('Dan', 'Frank', 8, 7);

