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

// Position schema
const positionSchema = mongoose.Schema({
    payeeType: String,
    boxes: [boxSchema], // show this when type is 'position'
});

// Responsibility Center schema
const responsibilityCenterSchema = mongoose.Schema({
    particular: { type: String, required: true }, // IMO, CO, etc.
    payeeTypes: { type: [positionSchema], default: [] },
});

// Transaction Type schema
const setSignatorychema = mongoose.Schema({
    responsibilityCenters: { type: [responsibilityCenterSchema], required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Set_Signatory', setSignatorychema);






