const setSignatory = require("../models/set_signatory");
const employees = require("../utils/employees");
const {
  responsibilityCenterToGeneral,
} = require("../utils/responsibility_center_map");
const positionTitle = require("../models/position_title");
const signatory = require("../models/signatory");

exports.getSignatories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // Parse `page` and `limit` to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the number of documents to skip
    const skip = pageNumber * limitNumber;
    // Fetch signatories with search, skip, and limit
    const signatories = await signatory
      .find({
        $or: [
          { payee: { $regex: search, $options: "i" } },
          { reportName: { $regex: search, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .skip(skip)
      .limit(limitNumber);
    // Get the total count for pagination metadata
    const totalCount = await signatory.countDocuments({
      $or: [
        { payee: { $regex: search, $options: "i" } },
        { reportName: { $regex: search, $options: "i" } },
      ],
    });

    // Return the results with pagination metadata
    res.json({
      signatories,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limitNumber),
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createSignatory = async (req, res) => {
  try {
    const payload = req.body;
    const sig = new signatory(payload);
    await sig.save();
    res.status(201).json({ message: "Signatory created successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSetSignatories = async (req, res) => {
  try {
    const positionTitles = await positionTitle.find();
    const allEmployees = employees.filter(
      (emp) => emp.EmployeeFullName !== "VACANT"
    );
    res.json({ employees: allEmployees, positionTitles });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getPositionTitles = async (req, res) => {
  try {
    const positionTitles = await positionTitle.find();
    res.json({ positionTitles });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// SET SIGNATORY ENTITY HERE!
exports.createSetSignatory = async (req, res) => {
  try {
    const payload = req.body;
    const setSign = new setSignatory(payload);
    await setSign.save();
    res.status(201).json({ message: "Set Signatory created successfully" });
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ error: "Transaction Type already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

exports.getTransactionTypesByReportName = async (req, res) => {
  try {
    const user = req.user;
    const { reportName, positionType } = req.query;

    const results = await setSignatory.find({
      $and: [
        {
          responsibilityCenters: {
            $elemMatch: {
              particular: {
                $regex: responsibilityCenterToGeneral(user.Region),
                $options: "i",
              },
            },
          },
        },
        {
          reportName: { $regex: reportName, $options: "i" },
        },
        {
          responsibilityCenters: {
            $elemMatch: {
              positionTypes: {
                $elemMatch: {
                  positionType: { $regex: positionType, $options: "i" },
                },
              },
            },
          },
        },
      ],
    });

    //   previous version
    // Extract and return the matching `transactionType`s
    // const transactionTypes = results.flatMap((doc) =>
    //   doc.responsibilityCenters
    //     .map((center) => center.transactionType)
    //     .filter((transaction) => transaction.reportName === reportName)
    // );
    res.json({ transactionTypes: results });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
