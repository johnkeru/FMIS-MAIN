const mongoose = require('mongoose');

const boxSchema = mongoose.Schema({
    name: String,
    findPosition: String, // findPosition is use for getting the real position title in sir joseph's api
    displayPosition: String, // this one is for displaying in the UI
    department: String,
    division: String,
    isPayeeDepartmentDependent: { type: Boolean, default: false },
    isPayeeDivisionDependent: { type: Boolean, default: false },
})

const positionSchema = mongoose.Schema({
    boxes: [boxSchema], // show this when type is 'position'
    positionType: String
})

// Position schema
const transactionSchema = mongoose.Schema({
    reportName: String, // to filter what transactions types to show
    transactionType: String,
    positionTypes: [positionSchema]
});

// Responsibility Center schema
const responsibilityCenterSchema = mongoose.Schema({
    particular: { type: String, required: true }, // IMO, CO, etc.
    transactionType: transactionSchema,
});

// Transaction Type schema
const setSignatorychema = mongoose.Schema({
    responsibilityCenters: { type: [responsibilityCenterSchema], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Set_Signatory', setSignatorychema);

