const Router = require('express').Router
const { setMappedPositions } = require('../static/set_position_titles')
const { setRolesAndAssign } = require('../static/set_roles_and_super_admin')
const { setSignatories } = require('../static/set_signatories')

const setterDataRouter = Router()

setterDataRouter.get('/', (req, res) => res.json({ message: 'The server is up and running' }))

// PLEASE ONLY CALL THIS ONCE!
setterDataRouter.get('/setRolesAndAssign', async (req, res) => {
    try {
        const message1 = await setRolesAndAssign() // good
        res.json({ message1, })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
})


setterDataRouter.get('/setSignatories', async (req, res) => {
    try {
        const message1 = await setSignatories()
        const message2 = await setMappedPositions()
        res.json({
            message1,
            message2,
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
})

module.exports = setterDataRouter