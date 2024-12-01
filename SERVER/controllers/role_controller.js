const assignedRole = require('../models/assigned_role')
const role = require('../models/role')

// this only works for one admin per system
exports.getRoles = async (req, res) => {
    try {
        let roles = []
        const rolesFromRequest = req.query.roles
        const tab = req.query.tab

        // it is string if only 1 role and array if multiple
        if (typeof rolesFromRequest === 'string') {
            if (rolesFromRequest === 'SUPER ADMIN') { // get all roles if super admin
                roles = await role.find({
                    $and: [
                        { enabled: !tab || tab == 'active' },
                        { name: { $ne: 'SUPER ADMIN' } }
                    ]
                }).sort({ name: 1 })
            } else {
                const prefix = rolesFromRequest.split(' ')[0] // if normal admin, get the roles with same name but prefix
                roles = await role.find({
                    $and: [
                        { enabled: !tab || tab == 'active' },
                        {
                            name: {
                                $regex: prefix,          // Match roles starting with "BUDGET"
                                $not: { $regex: 'ADMIN' }  // Exclude roles containing "ADMIN"
                            }
                        }
                    ]
                }).sort({ name: 1 })
            }
        } else {
            const adminRoles = rolesFromRequest.filter(role => role.includes('ADMIN'));
            const roleQueries = adminRoles.map(admin => {
                const prefix = admin.split(' ')[0]; // Extract the prefix from each admin role
                return {
                    $and: [
                        { enabled: !tab || tab == 'active' },
                        {
                            name: {
                                $regex: new RegExp(`^${prefix}`, 'i'),          // Match roles starting with the prefix, case-insensitive
                                $not: { $regex: new RegExp('ADMIN', 'i') }     // Exclude roles containing "ADMIN", case-insensitive
                            }
                        }
                    ]
                };
            });
            // Execute the role queries
            roles = await role.find({ $or: roleQueries }).sort({ name: 1 });
        }

        res.json({ roles })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Server error' })
    }
}


// Create a new role
exports.createRole = async (req, res) => {
    const { name, permission } = req.body;
    try {
        const upperCaseName = name.toUpperCase()
        const newRole = new role({ name: upperCaseName, permission });
        await newRole.save();
        res.status(201).json({ message: 'Role created successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Role already exists.' })
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, permission } = req.body;

    const upperCaseName = name.toUpperCase()
    try {
        const updatedRole = await role.findByIdAndUpdate(id, { name: upperCaseName, permission }, { new: true });
        if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
        res.json({ message: 'Role updated successfully', updatedRole });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Role already exists.' })
    }
};

// Delete a role
// this will also become toggle: delete or enable
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    const tab = req.query.tab
    try {
        const updatedRoleToDisable = await role.findByIdAndUpdate(id, { enabled: tab == 'disabled' });
        if (!updatedRoleToDisable) return res.status(404).json({ error: 'Role not found' });
        await assignedRole.updateMany(
            { roles: updatedRoleToDisable._id },   // Find documents where "Role._id" is present in roles
            { $pull: { roles: updatedRoleToDisable._id } }  // Remove "Role._id" from the roles array
        )
        res.json({ message: tab == 'disabled' ? 'Role enabled successfully' : 'Role disabled successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.assignRoles = async (req, res) => {
    try {
        // user: 6 digits, roles: ['SUPER ADMIN', DV]
        const { user, roles, assignedBy, fullName } = req.body
        // check if user is already assigned before
        const isAssigned = await assignedRole.findOne({ user }).populate({ path: 'roles', select: 'name' })
        // if exist then updating
        if (isAssigned) {
            const isSuperAdmin = isAssigned.roles.find(r => r.name === 'SUPER ADMIN')
            // if assignedBy is not same with isAssigned's assignedBy value then error
            if (isAssigned.assignedBy != assignedBy || isSuperAdmin) return res.status(403).json({ error: 'You cannot update assigned roles' })
            await assignedRole.findByIdAndUpdate(isAssigned._id, { roles, assignedBy, fullName })
            return res.json({ message: 'Roles updated successfully' })
        }

        // if not then creating new
        const newAssignedRole = new assignedRole({ user, roles, assignedBy, fullName })
        await newAssignedRole.save()
        res.json({ message: 'Roles assigned successfully' })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.getRolesYouHaveAssigned = async (req, res) => {
    try {
        const isSA = Boolean(req.query.superAdmin)
        const { Username } = req.user
        const superAdminRole = await role.findOne({ name: 'SUPER ADMIN' })
        const assignedRoles = isSA ?
            await assignedRole.find({
                $and: [
                    { roles: { $ne: [superAdminRole._id] } }
                ]
            }).populate({ path: 'roles', select: 'name' }) :
            await assignedRole.find({
                $and: [
                    { assignedBy: Username[0] },
                    { roles: { $ne: [superAdminRole._id] } }
                ]
            }).populate({ path: 'roles', select: 'name' })
        res.json({ assignedRoles })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Server error' })
    }
}