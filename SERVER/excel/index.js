const xlsx = require('xlsx');
const workbook = xlsx.readFile('excel/POSITION-EMPLOYEE-TEMPLATED-FULL.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const employees = xlsx.utils.sheet_to_json(worksheet);


// const empsRoles = new Set(employees.map(emp => emp.PositionTitle))
// console.log(empsRoles);

// const emps = employees.filter(emp => {
//     if (emp.Department === 'FINANCIAL MANAGEMENT DEPARTMENT') {
//         if (emp.Division.includes('ACCOUNTING DIVISION')) {
//             if (emp.PositionTitle.includes('Division Manager')) {
//                 return true;
//             }
//         }
//     }
// })
// console.log(emps)

// const emps = employees.filter(emp => emp.PositionTitle?.includes('Department Manager')).map(emp => emp.Department)
// console.log(emps, emps.length)

// const emps = employees.filter(emp => emp.PositionTitle.includes(('Manage')))
// console.log(emps)

// const emps = employees.filter(emp => emp.EmployeeFullName.includes(('Pepito')))
// console.log(emps)

// const emp = employees.find(emp => emp.PositionTitle.includes(('Administrator')))
// console.log(emp)

// const employee = employees.filter(emp => emp.SG >= 24 && /corpor/i.test(emp.Department));
// console.log(employee);

// const emp = employees
//     .filter(emp => /corporate/i.test(emp.Department))
//     .sort((a, b) => a.SG - b.SG); // Use the 'SG' field for sorting

// console.log(emp);

// const emp = employees.filter(emp => /Office of the Deputy Administrator for Engineering and Operations/i.test(emp.Department))
// console.log(emp)

// const emp = employees.filter(emp => /Researcher Analyst A/i.test(emp.PositionTitle))
// console.log(emp)

// const employee = employees.filter(emp => /Balanay/i.test(emp.EmployeeFullName));
// console.log(employee);

const employee = employees.filter(emp => /eunel/i.test(emp.EmployeeFullName));
console.log(employee);



// const employee = employees.filter(emp => emp.SG == 7 && emp.Status === 'PERMANENT');
// console.log(employee);

// const employee = employees.filter(emp => /FINANCIAL MANAGEMENT DEPARTMENT/i.test(emp.Department) && /Department Manager A/i.test(emp.PositionTitle));
// console.log(employee);


// iisa lng pala
// const employee = employees.filter(emp => /HUMAN RESOURCES DIVISION/i.test(emp.Division) && /Human Resource Management Officer IV/i.test(emp.PositionTitle));
// console.log(employee);

// const employee2 = employees.filter(emp => /division/i.test(emp.PositionTitle));
// console.log(employee2, employee2.length);

// const divEmployees = employees.filter(emp => {
//     if (emp.Department === employee.Department) {
//         return true;
//         // if (emp.Division === employee.Division) {
//         //     // last find the position of the employee (encoded)
//         //     return true;
//         // }
//     }
// })
// console.log(divEmployees, divEmployees.length)
// const boxA = employees.filter(emp => emp.PositionTitle.includes((payee.PositionTitle)))
// console.log(boxA)



// first get the transaction type
// next get the payee
// 