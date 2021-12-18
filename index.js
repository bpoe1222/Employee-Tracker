const inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

// Inital Prompt - Main Menu
const promptUser = () => {
        prompt({
            type: 'list',
            name: 'Choice List',
            message: 'What are we doing today? (Select one of the following)',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Department', 'View Roles', 'Add Role', 'Exit']
        })
        // Take the data and use switch statements to decide what to do per option
        .then((data) => {
            switch (data['Choice List']) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployees();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View Departments':
                    viewAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Exit':
                    break;
            }
        })
};

// You must export your module before you require module for circular page being required
module.exports = { promptUser }
const { viewAllEmployees, addEmployees, updateEmployee } = require('./lib/employee');
const { viewAllDepartments, addDepartment } = require('./lib/department-methods');
const { viewRoles, addRole } = require('./lib/roles-methods');

promptUser();