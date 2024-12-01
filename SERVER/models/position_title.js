// full CO Authorized signatory employee
// purpose of this is for transaction with type of 'position'. to get the right sequence of signatories
const mongoose = require('mongoose');

const positionTitlesSchema = mongoose.Schema({
    findPosition: String,
    displayPosition: String,
})

module.exports = mongoose.model('Position_Title', positionTitlesSchema);