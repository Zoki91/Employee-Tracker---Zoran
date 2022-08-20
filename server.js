const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');


// Connect to database - Class Work #12 Connect-Node
const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'admin1234',
    database: 'employee_db',
});

// Database Connect
db.connect(() => {
    console.log(`You are now connected to the Employee database.`)
    myDepartmentQuestions()
})

// Main Prompt
const myDepartmentQuestions = () => {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "allSelection",
            choices: ["View All Employees", "Add Employee", "Update Employee", "View All Roles", "Add Role", "View All Departments", "Add A New Department", "Delete A Department", "Quit"]
        }])
        /* Pass your questions in here */
        .then(({
            allSelection
        }) => {
            switch (allSelection) {
                case "View All Employees":
                    viewAllEmployees();
                    break
                case "Add Employee":
                    addAnEmployee();
                    break
                case "Update Employee":
                    updateEmployee();
                    break
                case "View All Roles":
                    viewAllRoles();
                    break
                case "Add Role":
                    addNewRole();
                    break
                case "View All Departments":
                    viewAllDepartments();
                    break
                case "Add A New Department":
                    addAdepartment();
                    break
                case "Delete A Department":
                    deleteADepartment();
                    break
                default:
                    db.end();
                    process.exit(0);
            }
        })
};

// Viewing All Employees
const viewAllEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary AS salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id`,
        (err, response) => {
            if (err) throw err;
            console.table(response)
            myDepartmentQuestions()
        })
};

// Adding a New Employee
const addAnEmployee = () => {
    inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: "Enter the Employee's First Name."
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the Employee's Last Name."
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the Employee's Role ID."
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Enter the Employee's Manager's ID."
        }
    ]).then(response => {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)';
        const values = [response.first_name, response.last_name, response.role_id, response.manager_id]
        db.query(sql, [values], (err, response) => {
            if (err) throw err;
            console.log(`\nNew Employee role has been successfully Added!\n`)
            viewAllEmployees()
        })
    });
}

// Updating the Employee
const updateEmployee = () => {
    inquirer.prompt([{
            type: 'number',
            name: 'whichEmployee',
            message: 'Please enter employee ID to update'
        },
        {
            type: 'number',
            name: 'employeeNewRole',
            message: 'Please enter the role ID you wish to update to'
        }
    ]).then(response => {
        db.query(`UPDATE employee SET role_id = ${response.employeeNewRole} WHERE id = ${response.whichEmployee};`,
            (err, results) => {
                console.log(`\nEmployee's role has been updated successfully!\n`)
                viewAllEmployees()
            })
    })
};

// Viewing All Roles
const viewAllRoles = () => {
    db.query('SELECT * FROM role;',
        function(err, response) {
            if (err) throw err;
            console.table(response)
            console.log(`\nYou are now viewing all the Roles in our Company!\n`)
            myDepartmentQuestions()
        })
}

// Viewing All Departments
const viewAllDepartments = () => {
    db.query('SELECT * FROM department;',
        function(err, response) {
            if (err) throw err;
            console.table(response)
            console.log(`\nYou are now viewing all Departments!\n`)
            myDepartmentQuestions()
        })
}

// Adding A New Department
function addAdepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'newDepartmentAdded',
        message: 'Enter department name.',
    }]).then(({
        newDepartmentAdded
    }) => {
        db.query('INSERT INTO department (name) VALUES (?);', newDepartmentAdded, (err, res) => {
            if (err) return console.log(err.message)
            console.log(`\nYou have Successfully Added a New Department!\n`)
            viewAllDepartments()
        })
    })
};

// Adding a New Role
const addNewRole = () => {
    inquirer.prompt([{
            type: 'input',
            name: 'role_title',
            message: 'Enter New Roles Title.'
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'Enter New Role"s Salary.'
        },
        {
            type: 'input',
            name: 'role_department_id',
            message: "Enter New Role's Department ID."
        }
    ]).then(response => {
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?)';
        const values = [response.role_title, response.role_salary, response.role_department_id]
        db.query(sql, [values], (err, res) => {
            if (err) return console.log(err.message)
            console.log(`\nYou have Successfully Added a New Role!\n`)
            viewAllRoles()
        })
    })
};

// Deleting a Department
const deleteADepartment = () => {
    inquirer.prompt([{
            type: 'input',
            name: 'delete_department_id',
            message: 'Please enter the Department ID you want to delete'
        }])
        .then(response => {
            const sql = 'DELETE FROM department WHERE id = ?'
            const values = [response.delete_department_id]
            db.query(sql, [values], (err, res) => {
                if (err) return console.log(err.message)
                console.log(`\nDepartment has been Successfully Deleted!`)
                viewAllDepartments()
            })

        })
}