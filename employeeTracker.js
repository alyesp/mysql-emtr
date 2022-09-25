// connect to db to preform queries
const mysql = require('mysql2');
//interact with user by command line
const inquirer = require ('inquirer');
//dotenv for environmental variables 
require('dotenv').config();
// print MYSQL rows to console
require('console.table');