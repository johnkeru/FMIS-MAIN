const position_title = require('../models/position_title')
const mappedPositions = [
    {
        displayPosition: 'Manager, Human Resources Division',
        findPosition: 'Human Resource Management Officer IV',
    },
    {
        displayPosition: 'Manager, Accounting Division',
        findPosition: 'Division Manager A',
    },
    {
        displayPosition: 'Manager, Administrative Department',
        findPosition: 'Department Manager A',
    },
    {
        displayPosition: 'Deputy Administrator for Administrative & Finance',
        findPosition: 'Deputy Administrator',
    },
    {
        displayPosition: 'Department Manager/Project Manager',
        findPosition: 'Department Manager A',
    },
    {
        displayPosition: 'Department/Project Manager',
        findPosition: 'Department Manager A',
    },
    {
        displayPosition: 'Manager, Division',
        findPosition: 'Division Manager A',
    },
    {
        displayPosition: 'Administrator',
        findPosition: 'Administrator',
    },
    {
        displayPosition: 'Deputy Administrator',
        findPosition: 'Deputy Administrator',
    },
    {
        displayPosition: 'Senior Deputy Administrator',
        findPosition: 'Senior Deputy Administrator',
    },
    {
        displayPosition: 'Deputy Administrator for Engineering & Operations',
        findPosition: 'Deputy Administrator',
    },
    {
        displayPosition: 'Deputy Administrator For Administrative and Finance Sector',
        findPosition: 'Deputy Administrator',
    },
    {
        displayPosition: 'Manager, Financial Management Department',
        findPosition: 'Department Manager A',
    },
    {
        displayPosition: 'Corporate Board Secretary',
        findPosition: 'Corporate Board Secretary A',
    }
]

exports.setMappedPositions = async () => {
    await position_title.deleteMany({})
    mappedPositions.forEach(async position => {
        const mapped = new position_title(position)
        await mapped.save()
    })
    return 'Mapped Positions successfully saved'
}

