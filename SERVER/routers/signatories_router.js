const { getSetSignatories, getSignatories, createSignatory, getTransactionTypesByReportName} = require('../controllers/signatories_controller');
const check_token = require('../middleware/check_token')

const Router = require('express').Router;

const signatoriesRouter = Router()

signatoriesRouter.get('/get-signatories',check_token, getSignatories)
signatoriesRouter.post('/create-signatories',check_token, createSignatory)
signatoriesRouter.get('/signatories-options-values',check_token, getSetSignatories)
signatoriesRouter.get('/get-transaction-types-by-report-name',check_token, getTransactionTypesByReportName)

module.exports = signatoriesRouter;