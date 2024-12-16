const POSITIONS = require('./positions_enum')

module.exports = {
    responsibilityCenters: [
        {
            particular: 'CO & CO-Based Projects',
            transactionType:
                {
                    // under division manager
                    reportName: 'DISBURSEMENT VOUCHER',
                    transactionType: 'Telephone/Communication Services', 
                    positionTypes: [
                        {
                            positionType: 'Below Division Manager',
                            boxes: [
                                {
                                    name: 'BOX A CERTIFIED',
                                    findPosition: POSITIONS.DIVISION_MANAGER.findPosition,
                                    displayPosition: POSITIONS.DIVISION_MANAGER.displayPosition,
                                    isPayeeDepartmentDependent: true,
                                    isPayeeDivisionDependent: true,
                                },
                                {
                                    name: 'BOX C CERTIFIED',
                                    findPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.findPosition,
                                    displayPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.displayPosition,
                                    department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                                    division: 'ACCOUNTING DIVISION'
                                },
                                {
                                    name: 'BOX D APPROVED FOR PAYMENT',
                                    findPosition: POSITIONS.DEPARTMENT_MANAGER.findPosition,
                                    displayPosition: POSITIONS.DEPARTMENT_MANAGER.displayPosition,
                                    isPayeeDepartmentDependent: true
                                },
                            ]
                        },

                        {
                            positionType: 'Division Manager',
                            boxes: [
                                {
                                    name: 'BOX A CERTIFIED',
                                    findPosition: POSITIONS.DEPARTMENT_MANAGER.findPosition,
                                    displayPosition: POSITIONS.DEPARTMENT_MANAGER.displayPosition,
                                    isPayeeDepartmentDependent: true
                                },
                                {
                                    name: 'BOX C CERTIFIED',
                                    findPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.findPosition,
                                    displayPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.displayPosition,
                                    department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                                    division: 'ACCOUNTING DIVISION'
                                },
                                {
                                    name: 'BOX D APPROVED FOR PAYMENT',
                                    findPosition: POSITIONS.DEPUTY_ADMINISTRATOR_FOR_ADMINISTRATIVE_AND_FINANCE_SECTOR.findPosition,
                                    displayPosition: POSITIONS.DEPUTY_ADMINISTRATOR_FOR_ADMINISTRATIVE_AND_FINANCE_SECTOR.displayPosition,
                                },
                            ]
                        },

                        {
                            positionType: 'Department Manager & Project Manager',
                            boxes: [
                                {
                                    name: 'BOX A CERTIFIED',
                                    findPosition: POSITIONS.DEPUTY_ADMINISTRATOR_CONCERNED.findPosition,
                                    displayPosition: POSITIONS.DEPUTY_ADMINISTRATOR_CONCERNED.displayPosition,
                                },
                                {
                                    name: 'BOX C CERTIFIED',
                                    findPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.findPosition,
                                    displayPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.displayPosition,
                                    department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                                    division: 'ACCOUNTING DIVISION'
                                },
                                {
                                    name: 'BOX D APPROVED FOR PAYMENT',
                                    findPosition: POSITIONS.SENIOR_DEPUTY_ADMINISTRATOR.findPosition,
                                    displayPosition: POSITIONS.SENIOR_DEPUTY_ADMINISTRATOR.displayPosition,
                                },
                            ]
                        },  

                        {
                            positionType: 'Department Manager, under Office of the Administrator -Top Management -IAS -CORPLAN -PAIS -LEGAL',
                            boxes: [
                                {
                                    name: 'BOX A CERTIFIED',
                                    findPosition: POSITIONS.SENIOR_DEPUTY_ADMINISTRATOR.findPosition,
                                    displayPosition: POSITIONS.SENIOR_DEPUTY_ADMINISTRATOR.displayPosition,
                                },
                                {
                                    name: 'BOX C CERTIFIED',
                                    findPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.findPosition,
                                    displayPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.displayPosition,
                                    department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                                    division: 'ACCOUNTING DIVISION'
                                },
                                {
                                    name: 'BOX D APPROVED FOR PAYMENT',
                                    findPosition: POSITIONS.ADMINISTRATOR.findPosition,
                                    displayPosition: POSITIONS.ADMINISTRATOR.displayPosition,
                                },
                            ]
                        },

                    ]
                },
        },
    ]
}