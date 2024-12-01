const setSignatoryData = {
    transactionType: 'Reimbursement of Traveling and Training Allowances - Local',
    responsibilityCenters: [
        {
            particular: 'CO & CO-Based Projects',
            payeeTypes: [
                {
                    // under division manager
                    payeeType: 'Below Division Manager', // anything. must not Division Manager & Project Manager.
                    boxes: [
                        {
                            name: 'BOX A CERTIFIED',
                            findPosition: 'Division Manager A',
                            displayPosition: 'Manager, Division',
                            isPayeeDepartmentDependent: true,
                            isPayeeDivisionDependent: true
                        },
                        {
                            name: 'BOX C CERTIFIED',
                            findPosition: 'Division Manager A',
                            displayPosition: 'Manager, Accounting Division',
                            department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                            division: 'ACCOUNTING DIVISION'
                        },
                        {
                            name: 'BOX D APPROVED FOR PAYMENT',
                            findPosition: 'Department Manager A',
                            displayPosition: 'Department/Project Manager',
                            isPayeeDepartmentDependent: true
                        },
                    ]
                },
                {
                    payeeType: 'Division Manager A', // payee
                    boxes: [
                        {
                            name: 'BOX A CERTIFIED',
                            findPosition: 'Department Manager A',
                            displayPosition: 'Department/Project Manager',
                            isPayeeDepartmentDependent: true
                        },
                        {
                            name: 'BOX C CERTIFIED',
                            findPosition: 'Division Manager A',
                            displayPosition: 'Manager, Accounting Division',
                            department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                            division: 'ACCOUNTING DIVISION'
                        },
                        {
                            name: 'BOX D APPROVED FOR PAYMENT',
                            findPosition: 'Deputy Administrator',
                            displayPosition: 'Deputy Administrator For Administrative and Finance Sector',
                            department: 'OFFICE OF THE DEPUTY ADMINISTRATOR FOR ADMINISTRATIVE AND FINANCE',
                            division: 'OFFICE OF THE DEPUTY ADMINISTRATOR FOR ADMINISTRATIVE AND FINANCE'
                        },
                    ]
                },
                {
                    payeeType: 'Department Manager & Project Manager', // should match the payee's position
                    boxes: [
                        {
                            name: 'BOX A CERTIFIED',
                            findPosition: 'Deputy Administrator',
                            displayPosition: 'Deputy Administrator',
                        },
                        {
                            name: 'BOX C CERTIFIED',
                            findPosition: 'Division Manager A',
                            displayPosition: 'Manager, Accounting Division',
                            department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                            division: 'ACCOUNTING DIVISION'
                        },
                        {
                            name: 'BOX D APPROVED FOR PAYMENT',
                            findPosition: 'Senior Deputy Administrator',
                            displayPosition: 'Senior Deputy Administrator',
                            department: 'OFFICE OF THE SENIOR DEPUTY ADMINISTRATOR',
                            division: 'OFFICE OF THE SENIOR DEPUTY ADMINISTRATOR'
                        },
                    ]
                },
                {
                    payeeType: 'Department Manager, under Office of the Administrator -Top Management -IAS -CORPLAN -PAIS -LEGAL', // this is else for above all conditions
                    boxes: [
                        {
                            name: 'BOX A CERTIFIED',
                            findPosition: 'Senior Deputy Administrator',
                            displayPosition: 'Senior Deputy Administrator',
                            department: 'OFFICE OF THE SENIOR DEPUTY ADMINISTRATOR',
                            division: 'OFFICE OF THE SENIOR DEPUTY ADMINISTRATOR'
                        },
                        {
                            name: 'BOX C CERTIFIED',
                            findPosition: 'Division Manager A',
                            displayPosition: 'Manager, Accounting Division',
                            department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                            division: 'ACCOUNTING DIVISION'
                        },
                        {
                            name: 'BOX D APPROVED FOR PAYMENT',
                            findPosition: 'Administrator',
                            displayPosition: 'Administrator',
                            department: 'OFFICE OF THE ADMINISTRATOR',
                            division: 'OFFICE OF THE ADMINISTRATOR'
                        },
                    ]
                },
                {
                    payeeType: 'Suppliers and Other Individuals/Agency Outside NIA',
                    boxes: [
                        {
                            name: 'BOX A CERTIFIED',
                            findPosition: 'Corporate Board Secretary A',
                            displayPosition: 'Department/Project Manager',
                            department: 'OFFICE OF THE CORPORATE BOARD SECRETARY',
                            division: 'OFFICE OF THE CORPORATE BOARD SECRETARY'
                        },
                        {
                            name: 'BOX C CERTIFIED',
                            findPosition: 'Division Manager A',
                            displayPosition: 'Manager, Accounting Division',
                            department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                            division: 'ACCOUNTING DIVISION'
                        },
                        {
                            name: 'BOX D APPROVED FOR PAYMENT',
                            findPosition: 'Administrator',
                            displayPosition: 'Administrator',
                            department: 'OFFICE OF THE ADMINISTRATOR',
                            division: 'OFFICE OF THE ADMINISTRATOR'
                        },
                    ]
                },

                {
                    payeeType: 'Contractors Up to 250M',
                    boxes: [
                        {
                            name: 'BOX A CERTIFIED',
                            findPosition: 'Department Manager A',
                            displayPosition: 'Department/Project Manager',
                            isPayeeDepartmentDependent: true,
                        },
                        {
                            name: 'BOX C CERTIFIED',
                            findPosition: 'Division Manager A',
                            displayPosition: 'Manager, Accounting Division',
                            department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                            division: 'ACCOUNTING DIVISION'
                        },
                        {
                            name: 'BOX D APPROVED FOR PAYMENT',
                            findPosition: 'Deputy Administrator',
                            displayPosition: 'Deputy Administrator',
                        },
                    ]
                },

                {
                    payeeType: 'Contractors Above 250M',
                    boxes: [
                        {
                            name: 'BOX A CERTIFIED',
                            findPosition: 'Deputy Administrator',
                            displayPosition: 'Deputy Administrator for Engineering & Operations',
                            department: 'OFFICE OF THE DEPUTY ADMINISTRATOR FOR ENGINEERING AND OPERATIONS',
                            division: 'OFFICE OF THE DEPUTY ADMINISTRATOR FOR ENGINEERING AND OPERATIONS'
                        },
                        {
                            name: 'BOX C CERTIFIED',
                            findPosition: 'Department Manager A',
                            displayPosition: 'Manager, Financial Management Department',
                            department: 'FINANCIAL MANAGEMENT DEPARTMENT',
                            division: 'OFFICE OF THE DEPARTMENT MANAGER'
                        },
                        {
                            name: 'BOX D APPROVED FOR PAYMENT',
                            findPosition: 'Administrator',
                            displayPosition: 'Administrator',
                            department: 'OFFICE OF THE ADMINISTRATOR',
                            division: 'OFFICE OF THE ADMINISTRATOR'
                        },
                    ]
                },
            ]
        },


        {
            particular: 'RIO/IISO/PMO',
            boxes: [
                {
                    name: 'BOX A CERTIFIED',
                    findPosition: '', // to be added
                    displayPosition: 'Division Manager',
                },
                {
                    name: 'BOX C CERTIFIED',
                    findPosition: '', // to be added
                    displayPosition: 'Head Finance Section/Chief Corporate Accountant',
                },
                {
                    name: 'BOX D APPROVED FOR PAYMENT',
                    findPosition: '',
                    displayPosition: 'Regional/Department/Project Manager',
                },
            ]
        },
        {
            particular: 'IMO/Division Office, IISO',
            boxes: [
                {
                    name: 'BOX A CERTIFIED',
                    findPosition: '', // to be added
                    displayPosition: 'Section Chief',
                },
                {
                    name: 'BOX C CERTIFIED',
                    findPosition: '', // to be added
                    displayPosition: 'Head, Accounting Unit',
                },
                {
                    name: 'BOX D APPROVED FOR PAYMENT',
                    findPosition: '',
                    displayPosition: 'Manager, IMO/Division Office, IISO',
                },
            ]
        },
    ]
}

const setSignatory = require('../models/set_signatory')

exports.setSignatories = async () => {
    await setSignatory.deleteMany({})
    const transactEntry = new setSignatory(setSignatoryData)
    await transactEntry.save()
    return 'Set Signatories saved successfully.'
}








































