const Router = require('express').Router;

const employeeController = require('../controllers/employee_controller');

const employeeRouter = Router();

employeeRouter.get('/employee/:id', employeeController.getEmployeeDetailsById);

module.exports = employeeRouter;
