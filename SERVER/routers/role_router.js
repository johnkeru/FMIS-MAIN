const { getRoles, createRole, updateRole, deleteRole, assignRoles, getRolesYouHaveAssigned } = require('../controllers/role_controller')
const checkToken = require('../middleware/check_token')

const Router = require('express').Router

const roleRouter = Router()

roleRouter.get('/roles', getRoles)
roleRouter.post('/create-role', createRole)
roleRouter.put('/update-role/:id', updateRole)
roleRouter.delete('/delete-role/:id', deleteRole)
roleRouter.post('/assign-role', assignRoles)

roleRouter.get('/get-roles-you-assigned', checkToken, getRolesYouHaveAssigned)


module.exports = roleRouter