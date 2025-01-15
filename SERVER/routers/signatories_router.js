const {
  getSetSignatories,
  getSignatories,
  createSignatory,
  getTransactionTypesByReportName,
  getPositionTitles,
  createSetSignatory,
} = require("../controllers/signatories_controller");
const check_token = require("../middleware/check_token");

const Router = require("express").Router;

const signatoriesRouter = Router();

signatoriesRouter.get("/get-signatories", check_token, getSignatories);
signatoriesRouter.post("/create-signatories", check_token, createSignatory);
signatoriesRouter.get(
  "/signatories-options-values",
  check_token,
  getSetSignatories
);
signatoriesRouter.get("/get-position-titles", check_token, getPositionTitles);

// SET SIGNATORY ENTITY HERE!
signatoriesRouter.post(
  "/create-set-signatory",
  check_token,
  createSetSignatory
);

signatoriesRouter.get(
  "/get-transaction-types-by-report-name",
  check_token,
  getTransactionTypesByReportName
);

module.exports = signatoriesRouter;
