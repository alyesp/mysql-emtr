// connect to db to preform queries
const mysql = require('mysql2');
//interact with user by command line
const inquirer = require ("inquirer");

// implement FIGfont spec in Javascript
const figlet = require('figlet');
//dotenv for environmental variables 
require('dotenv').config();
// print MYSQL rows to console
const cTable = require('console.table');
// const response = require('express');
// const appendFile = require('fs');

const db = mysql.createConnection({
  host: 'localhost',
  // port: 3001,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'employeeTracker_db'
});

// connection.connect();
console.log(('======================================================================================================='));
console.log(``);
console.log((figlet.textSync('EMPLOYEE TRACKER')));
console.log(``);
console.log(`                               ` + ('(C)ONTENT (M)ANAGEMENT (S)YSTEM'));
console.log(``);
console.log((`======================================================================================================`));

// start questions

const start = () => {
  inquirer
  .prompt({
    name: 'choices',
    type: 'list',
    message: 'Please select a menu option...',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Exit Menu'
    ],
    name: 'choices',
  })
  .then((response) => {

    switch(response.choice){
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'Add employee':
        addEmployee();
        break;
      case 'Add department':
        addDepartment();
        break;
      case 'Add role':
        addRole();
        break;
      case 'Update employee role':
        updateEmployeeRole();
        break;
      case 'Quit':
        db.end();
        break;
      // default:
        // throw new Error('invalid initial user choice');
    }
  })
};

start();

const viewAllEmployees = () => {
  const query = `
  SELECT e.id, e.first_id, e.last_name, role.title, department.name, AS department, salary, IF NULL (concat(m.first_name, ' ' , m.last_name), 'N/A') AS manager
  FROM employee e
  LEFT JOIN employee m 
  ON m.id = e.manager_id
  JOIN ROLE
  ON e.role_id = role.id
  JOIN department
  ON role.department_id = department.id;`

  connection.query(
    query,
    (err, results) => {
      if (err) throw err;
      console.log('/n');
      console.table(results);
      start();
    }
  )
};

const viewAllDepartments = () => {
  const query = `SELECT department.id AS "Department ID", department.name AS Department FROM employees_db.department`;
  connect.query(
    query,
    (err, results) => {
      if(err) throw err;
      console.log('/n');
      console.table(results);
      start();
    }
  )
};

const viewAllRoles = () => {
  const query = `SELECT role.id AS "Role ID", role.title AS Role, role.salary, role.department_id AS "department ID" FROM employees_db.role`;
  db.query(
    query,
    (err,results) => {
      if (err) throw err;
      console.log('/n');
      console.table(results);
      start();
    }
  )
};

// Adds Employee, Role, Department

const addEmployee = async () => {

  db.query('select * FROM role', async (err, role) => {
    if (err) throw err;

  db.query ('Select * FROM employee WHERE manager_id IS NULL', async (err, managers) => {
   if (err) throw err;

    managers = managers.map(manager => ({name: manager.first_name + " " + manager.last_name, value: manager.id}));
    managers.push({ name:"None"});

    const responses = await inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name:"first_name"
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name:"last_name"
        },
        {
          type:"list",
          message:"what is the employee's role?",
          choices: role.map(role => ({name:role.title, value:role.id})),
          name: "role_id",
        },
        {
          type:"list",
          message: "Who is the Employee's manager?",
          name: "manager_id"
        }
      ])

      if (responses.manager_id === "None") {
        responses.manager_id = null;
      }

      db.query(
       'INSERT INTO employee SET ?',
        {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: response.role_id,
          manager_id: responses.manager_id
        },
         (err, res) => {
          if(err) throw err;
          console.log("New employee added.");
           start();
        }
      )
   })
 })//something's wrong
};
  
  const addDepartment = async () => {
  const response = await inquirer
    .prompt([
      {
        name:"newDepartment",
        type: 'input',
        message:'What is the new department name?'
      }
     ])
    
  db.query(
     'INSERT INTO employee_db.department SET?',
    {
     name:response.newDepartment,
    },
     (err) => {
     if (err) throw err;
    console.log('New department added successfully!');
    start();
    }
  )
};

const getDepartments = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM employees_db.department`;
    db.query(
      query,
      (err, results) => {
        if (err) reject (err);
        resolve(results);
      }
    )
  })
};

const addRole = async () => {

  const departments = await getDepartments();
  const responses = await inquirer
  .prompt([
    {
      name:'title',
      type:'input',
      message:'What is the new role?'
    },
    {
      name: 'salary',
      type:'number',
      message: "What is the role's salary?"
    },
    {
      name:'department',
      type:'list',
      choices: department.map(department => department.name),
      message:'What department is the role in?'
    }
  ]);

  departments.forEach(department => {
    if (department.name === responses.department) {
      responses.department = department.id;
    }
  });

  db.query(
    'INSERT INTO employee_db.role SET ?',
    {
      title: responses.title,
      salary: responses.salary,
      department_id:responses.department
    },
    (err) => {
      if(err) throw err;
      console.log('New role successfully added!')
      start();
    })
};

// update to table

const udEmployeeRole = async () => {
  db.query('SELECT * FROM employee', async (err, employees) => {
    if(err) throw err;

    const employeeSelected = await inquirer 
      .prompt([
        {
          name:'employee_id',
          type:'list',
          choices: employees.map(employee => ({name:employee.first_name + " " + employee.last_name, value:employee.id})),
          message:'Whose role would you like to update?'
        }
      ])

    db.query(
      'UPDATE employees_db.employee SET ? WHERE ?',
      [
        {
          role_id: roleSelected_id
        },
        {
          id: employeeSelected.employee_id
        }
      ],
      (err) => {
        if (err) throw err;
        console.log('Employee role update!')
        start();
      }
    )
  })
};

// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });