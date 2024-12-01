// to possibly get the name of signatory
export const filterEmployees = ({ employees, division, department, positionTitle }) => {
    if (division && department && positionTitle) {
        // Filter by division, department, and position title
        return employees.filter(emp =>
            emp.Division === division &&
            emp.Department === department &&
            emp.PositionTitle === positionTitle
        );
    } else if (division && department) {
        // Filter by division and department
        return employees.filter(emp =>
            emp.Division === division &&
            emp.Department === department
        );
    } else if (division && positionTitle) {
        // Filter by division and position title
        return employees.filter(emp =>
            emp.Division === division &&
            emp.PositionTitle === positionTitle
        );
    } else if (department && positionTitle) {
        // Filter by department and position title
        return employees.filter(emp =>
            emp.Department === department &&
            emp.PositionTitle === positionTitle
        );
    } else if (division) {
        // Filter by division only
        return employees.filter(emp =>
            emp.Division === division
        );
    } else if (department) {
        // Filter by department only
        return employees.filter(emp =>
            emp.Department === department
        );
    } else if (positionTitle) {
        // Filter by position title only
        return employees.filter(emp =>
            emp.PositionTitle === positionTitle
        );
    } else {
        // No filters applied, return all employees
        return employees;
    }
};


// to get the possible signatories each box
export const boxConditions = (boxInfo, emp, payeeDepartment, payeeDivision) => {
    const positionRegex = new RegExp(boxInfo.findPosition, 'i');
    const departmentRegex = boxInfo.department ? new RegExp(boxInfo.department, 'i') : null;
    const divisionRegex = boxInfo.division ? new RegExp(boxInfo.division, 'i') : null;
    const payeeDepartmentRegex = payeeDepartment ? new RegExp(payeeDepartment, 'i') : null;
    const payeeDivisionRegex = payeeDivision ? new RegExp(payeeDivision, 'i') : null;

    const testPosition = positionRegex.test(emp.PositionTitle);
    const testPayeeDepartment = payeeDepartmentRegex ? payeeDepartmentRegex.test(emp.Department) : true;
    const testPayeeDivision = payeeDivisionRegex ? payeeDivisionRegex.test(emp.Division) : true;
    const testBoxDepartment = departmentRegex ? departmentRegex.test(emp.Department) : true;
    const testBoxDivision = divisionRegex ? divisionRegex.test(emp.Division) : true;

    if (boxInfo.isPayeeDepartmentDependent && boxInfo.isPayeeDivisionDependent) {
        return testPosition && testPayeeDepartment && testPayeeDivision;
    } else if (boxInfo.isPayeeDepartmentDependent) {
        return testPosition && testPayeeDepartment;
    } else if (boxInfo.isPayeeDivisionDependent) {
        return testPosition && testPayeeDivision;
    } else if (boxInfo.department && boxInfo.division) {
        return testPosition && testBoxDepartment && testBoxDivision;
    } else if (boxInfo.department) {
        return testPosition && testBoxDepartment;
    } else if (boxInfo.division) {
        return testPosition && testBoxDivision;
    } else {
        return testPosition;
    }
};