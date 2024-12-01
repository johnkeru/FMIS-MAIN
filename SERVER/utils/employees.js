const xlsx = require('xlsx');
const workbook = xlsx.readFile('excel/POSITION-EMPLOYEE-TEMPLATED-FULL.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const employees = xlsx.utils.sheet_to_json(worksheet);

module.exports = employees