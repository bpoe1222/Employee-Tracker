const { promptUser } = require('../index');
const inquirer = require('inquirer');
const mysql = require('mysql2');
var prompt = inquirer.createPromptModule();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeeTracker'
});


// View department
const viewAllDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(results);
            promptUser();
        }
    )
}

const addDepartment = () => {
    prompt({
            type: 'text',
            name: 'departmentName',
            message: 'Enter the name of the department you want to add: '
        })
        .then((data) => {
            connection.query(
                `INSERT INTO department (name)
                VALUES(?)`,
                [data.departmentName],
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }

                    console.log('Department added succesfully!');
                    promptUser();
                }
            )
        })
}

module.exports = { viewAllDepartments, addDepartment }