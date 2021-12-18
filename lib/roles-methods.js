const { promptUser } = require('../index');
const inquirer = require('inquirer');
const sql = require('mysql2');

const connect = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeeTracker'
});

const viewRoles = () => {
    connect.query(
        `SELECT roles.id, roles.title, roles.salary, department.name
            FROM roles
            LEFT JOIN department
            ON roles.department_id = department.id `,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(results);
            promptUser();
        }
    );
};

const addRole = () => {
    connect.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return;
            }

            let departmentArray = [];
            results.forEach(item => {
                departmentArray.push(item.name)
            })

            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'role_title',
                        message: 'Please enter the name of the role you would like to add: '
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'Please enter the salary for the role. (Do not use commas)'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Select the department this role will be in. ',
                        choices: departmentArray
                    }
                ])
                .then((data) => {
                    let department_id;

                    for (let i = 0; i < departmentArray.length; i++) {
                        if (departmentArray[i] === data.department) {
                            department_id = i + 1;
                        };
                    };

                    connect.query(
                        `INSERT INTO roles (title, salary, department_id)
                            VALUES(?,?,?)`,
                        [data.role_title, data.salary, department_id],
                        function (err, results, fields) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }

                            console.log('Role added!')
                            promptUser();
                        }
                    );
                });
        }
    );
};

module.exports = { viewRoles, addRole };