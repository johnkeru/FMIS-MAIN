const POSITIONS = require('./positions_enum')

module.exports = {
    responsibilityCenters: [
        {
            particular: 'CO & CO-Based Projects',
            transactionType:
                {
                    // under division manager
                    reportName: 'DISBURSEMENT VOUCHER',
                    transactionType: 'Infrastructure - Locally Funded Fund - Release of Retention', 
                    positionTypes: [

                        {
                            positionType: 'Contractors Up to 250M',
                            boxes: [
                                {
                                    name: 'BOX A CERTIFIED',
                                    findPosition: POSITIONS.DEPARTMENT_MANAGER.findPosition,
                                    displayPosition: POSITIONS.DEPARTMENT_MANAGER.displayPosition,
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
                                    findPosition: POSITIONS.DEPUTY_ADMINISTRATOR_CONCERNED.findPosition,
                                    displayPosition: POSITIONS.DEPUTY_ADMINISTRATOR_CONCERNED.displayPosition,
                                },
                            ]
                        },

                        {
                            positionType: 'Contractors Above 250M',
                            boxes: [
                                {
                                    name: 'BOX A CERTIFIED',
                                    findPosition: POSITIONS.OFFICE_OF_THE_DEPUTY_ADMINISTRATOR_FOR_ENGINEERING_AND_OPERATIONS.findPosition,
                                    displayPosition: POSITIONS.OFFICE_OF_THE_DEPUTY_ADMINISTRATOR_FOR_ENGINEERING_AND_OPERATIONS.displayPosition,
                                    department: 'OFFICE OF THE DEPUTY ADMINISTRATOR FOR ENGINEERING AND OPERATIONS',
                                    division: 'OFFICE OF THE DEPUTY ADMINISTRATOR FOR ENGINEERING AND OPERATIONS',
                                },
                                {
                                    name: 'BOX C CERTIFIED',
                                    findPosition: POSITIONS.MANAGER_FINANCIAL_MANAGEMENT_DEPARTMENT.findPosition,
                                    displayPosition: POSITIONS.MANAGER_FINANCIAL_MANAGEMENT_DEPARTMENT.displayPosition,
                                    department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                                    division: 'OFFICE OF THE DEPARTMENT MANAGER'
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