export const isSuperAdmin = (currentUser) => {
    if (currentUser.Roles.length >= 1) return currentUser.Roles.includes('SUPER ADMIN')
    return false;
}

export const isAccountingAdmin = (currentUser) => {
    if (currentUser.Roles.length >= 1) return currentUser.Roles.includes('ACCOUNTING ADMIN')
    return false;
}
export const isAccountingRoles = (currentUser) => {
    if (currentUser.Roles.length >= 1) return currentUser.Roles.join('').includes('ACCOUNTING')
    return false;
}

export const isBudgetAdmin = (currentUser) => {
    if (currentUser.Roles.length >= 1) return currentUser.Roles.includes('BUDGET ADMIN')
    return false;
}
export const isBudgetRoles = (currentUser) => {
    if (currentUser.Roles.length >= 1) return currentUser.Roles.join('').includes('BUDGET')
    return false;
}

export const isCashAdmin = (currentUser) => {
    if (currentUser.Roles.length >= 1) return currentUser.Roles.includes('CASH ADMIN')
    return false;
}
export const isCashRoles = (currentUser) => {
    if (currentUser.Roles.length >= 1) return currentUser.Roles.join('').includes('CASH')
    return false;
}

export const isAllowAdminsOnly = (currentUser) => {
    return isSuperAdmin(currentUser) || isBudgetAdmin(currentUser) || isAccountingAdmin(currentUser) || isDVAdmin(currentUser) || isCashAdmin(currentUser)
}