const assignedRole = require("../models/assigned_role");
const role = require("../models/role");

exports.setRolesAndAssign = async () => {
    const roles = [
        {
            name: 'SUPER ADMIN', // 'SUPER ADMIN'
            permission: 'Has full access to all systems.',
        },
        {
            name: 'BUDGET ADMIN',
            permission: 'Manages budget allocations and financial planning.',
        },
        // {
        //     name: 'DV ADMIN',
        //     permission: 'Handles disbursement vouchers and related approvals.',
        // },
        {
            name: 'ACCOUNTING ADMIN',
            permission: 'Oversees accounting tasks and financial records.',
        },
        {
            name: 'CASH ADMIN',
            permission: 'Manages cash flow and liquidity for the organization.',
        },
        // Add each sub-role similarly as below
        { name: 'BUDGET MANAGER', permission: 'Budget planning and execution.' },
        { name: 'BUDGET ANALYST', permission: 'Analyzes budget forecasts and financial data.' },
        { name: 'BUDGET COORDINATOR', permission: 'Coordinates budgetary processes and approvals.' },
        { name: 'BUDGET OFFICER', permission: 'Oversees budget implementation and adherence.' },

        { name: 'ACCOUNTING COUNTER', permission: 'Handles accounting counter tasks.' },
        { name: 'ACCOUNTING CLAIMS', permission: 'Manages accounting claims.' },
        { name: 'ACCOUNTING CLAIMS SECTION CHIEF', permission: 'Leads the claims section within accounting.' },
        { name: 'ACCOUNTING MANAGER', permission: 'Oversees the accounting department.' },

        { name: 'CASH MANAGER', permission: 'Oversees cash management strategies.' },
        { name: 'CASH ANALYST', permission: 'Analyzes cash flow and related data.' },
        { name: 'CASH COORDINATOR', permission: 'Coordinates cash-related transactions.' },
        { name: 'CASH OFFICER', permission: 'Manages day-to-day cash handling and records.' },

        // { name: 'DV MANAGER', permission: 'Manages disbursement workflows.' },
        // { name: 'DV ANALYST', permission: 'Analyzes disbursement data and trends.' },
        // { name: 'DV COORDINATOR', permission: 'Coordinates disbursement approvals and documentation.' },
        // { name: 'DV OFFICER', permission: 'Handles disbursement processing and compliance.' },
    ];

    // Delete all existing roles
    await role.deleteMany({});
    // Create roles and save them using Promise.all
    await Promise.all(
        roles.map(({ name, permission }) => {
            const newRole = new role({ name, permission });
            return newRole.save();
        })
    );

    // Set up Super Admins
    const superAdminRole = await role.findOne({ name: 'SUPER ADMIN' });
    const superAdmins = [
        { user: 447589, fullName: 'John Rey M. Querobin' },
        { user: 908785, fullName: 'Eunel Soliveres' },
        { user: 909549, fullName: 'Reymund M. Edra' },
        { user: 336165, fullName: 'Mam Sussie' },
        { user: 751754, fullName: 'Andrie C. Barrameda' },

        // { user: , fullName: '' },
        // { user: , fullName: '' },
        // { user: 904763, fullName: 'Sir Adrian' },
    ];

    // Delete all existing roles assigned to super admins
    await assignedRole.deleteMany({});

    // Assign roles to super admins using Promise.all
    await Promise.all(
        superAdmins.map(admin => {
            const assignRole = new assignedRole({ assignedBy: admin.user, user: admin.user, roles: [superAdminRole._id], fullName: admin.fullName, });
            return assignRole.save();
        })
    );

    return 'Roles set and Super Admins assigned successfully'
}

