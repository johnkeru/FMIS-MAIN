const Router = require('express').Router;

const employeeController = require('../controllers/employee_controller');

const employeeRouter = Router();

// the urls requires query params of either id or name
// e.g. http://localhost:5000/employee?id=236978
// e.g. http://localhost:5000/employee?name=John Doe
employeeRouter.get('/employee', employeeController.getEmployeeDetails);

module.exports = employeeRouter;
