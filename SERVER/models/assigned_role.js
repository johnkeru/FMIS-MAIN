const mongoose = require('mongoose');

const assignedRole = mongoose.Schema({
    assignedBy: Number,
    user: String, // the 6 digits
    fullName: String,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
})

module.exports = mongoose.model('Assigned_Role', assignedRole);