const xlsx = require('xlsx');
const workbook = xlsx.readFile('excel/POSITION-EMPLOYEE-TEMPLATED-FULL.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const employees = xlsx.utils.sheet_to_json(worksheet);


exports.getEmployeeDetails = (req, res) => { 
    const id = req.query.id
    const name = req.query.name
    
    let employee = null;
    if (id) employee = employees.find(emp => emp.EmployeeID === parseInt(id));
    else if (name) employee = employees.find(emp => emp.EmployeeFullName.toLowerCase().includes(name.toLowerCase()));
    
    res.json({employee});
}

