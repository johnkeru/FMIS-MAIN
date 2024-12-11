const POSITIONS = require('./positions_enum')

module.exports = {
    responsibilityCenters: [
        {
            particular: 'CO & CO-Based Projects',
            transactionType:
                {
                    // under division manager
                    reportName: 'DISBURSEMENT VOUCHER',
                    transactionType: 'Cash Advance - Special Disbursing Officer', 
                    positionTypes: [
                        {
                            positionType: 'Department Manager & Project Manager',
                            boxes: [
                                {
                                    name: 'BOX A CERTIFIED',
                                    findPosition: POSITIONS.MANAGER_ADMINISTRATIVE_DEPARTMENT.findPosition,
                                    displayPosition: POSITIONS.MANAGER_ADMINISTRATIVE_DEPARTMENT.displayPosition,
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
                    ]
                },
        },
    ]
}