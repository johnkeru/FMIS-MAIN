
const setSignatory = require('../models/set_signatory')
const signatory = require('../models/signatory')
const transactionTypes = require('./transaction_types/transaction_types')

exports.setSignatories = async () => {
    await setSignatory.deleteMany({})
    await signatory.deleteMany({}) // delete all signatories table
    transactionTypes.forEach(async (transactionType) => {
        const transactEntry = new setSignatory(transactionType)
        await transactEntry.save()
    })
    return 'Set Signatories saved successfully.'
}








































