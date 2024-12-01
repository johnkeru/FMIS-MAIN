const { getSetSignatories, getSignatories, createSignatory, } = require('../controllers/signatories_controller');
const check_token = require('../middleware/check_token')

const Router = require('express').Router;

const signatoriesRouter = Router()

signatoriesRouter.get('/get-signatories', getSignatories)
signatoriesRouter.post('/create-signatories', createSignatory)
signatoriesRouter.get('/signatories-options-values', check_token, getSetSignatories)

module.exports = signatoriesRouter;