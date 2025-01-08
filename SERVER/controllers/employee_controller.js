const xlsx = require('xlsx');
const workbook = xlsx.readFile('excel/POSITION-EMPLOYEE-TEMPLATED-FULL.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const employees = xlsx.utils.sheet_to_json(worksheet);


exports.getEmployeeDetailsById = (req, res) => { 
    const employee = employees.find(emp => emp.EmployeeID === parseInt(req.params.id));
    res.json(employee);
}

