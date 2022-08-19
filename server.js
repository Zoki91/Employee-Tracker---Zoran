const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');




// Connect to database - Class Work #12 Connect-Node
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'admin1234',
    database: 'employee_db'
  },
  console.log(`You are now onnected to the Employee database.`)
);





inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "allSelection",
      choices: ["View All Employees", "Add Employee", "Update Employee", "View All Roles", "Add Role", "View All Departments", "Quit"]
    },
  ])
  /* Pass your questions in here */
  .then(({ allSelection }) => {
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
        addRole();
        break
      case "View All Departments":
        viewAllDepartments();
        break;
      default:
        db.end();
        process.exit(0);
    }
  })


  

  
  
//     // Use user feedback for... whatever!!
  
//   .catch ((error) => {
//   if (error.isTtyError) {
//     // Prompt couldn't be rendered in the current environment
//   } else {
//     // Something else went wrong
//   }
// });















// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
