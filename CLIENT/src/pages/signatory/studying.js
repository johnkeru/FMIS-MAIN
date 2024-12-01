const transactionType = require('../models/transaction_type')
const employees = require('../utils/employees')
const { responsibilityCenterToGeneral } = require('../utils/responsibility_center_map')
const position_titles = require('../models/position_titles')
const signatory = require('../models/signatory')

exports.getSignatories = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        // Ensure `page` and `limit` are positive integers
        const pageNumber = Math.max(1, parseInt(page, 10));
        const limitNumber = Math.max(1, parseInt(limit, 10));
        console.log({ limit, limitNumber })

        // Pagination logic
        const skip = (pageNumber - 1) * limitNumber;
        // Find signatories with pagination and optional search
        const [signatories, total] = await Promise.all([
            signatory.find({
                $or: [
                    { payee: { $regex: search, $options: 'i' } },
                    { transactionType: { $regex: search, $options: 'i' } },
                ],
            })
                .skip(skip)
                .limit(limitNumber),
            signatory.countDocuments({
                $or: [
                    { payee: { $regex: search, $options: 'i' } },
                    { transactionType: { $regex: search, $options: 'i' } },
                ],
            }),
        ]);
        res.json({
            signatories,
            total,
            totalPages: Math.ceil(total / limitNumber),
            currentPage: pageNumber,
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.createSignatory = async (req, res) => {
    try {
        const payload = req.body
        const sig = new signatory(payload)
        await sig.save()
        res.status(201).json({ message: 'Signatory created successfully' });
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.getTransactionTypes = async (req, res) => {
    try {
        // expecting data from sir eunel: region, fullname and transaction type
        let transactionTypes = await transactionType.find()
        const positionTitles = await position_titles.find()
        const allEmployees = employees.filter(emp => emp.EmployeeFullName !== 'VACANT')

        const updatedTransactionTypes = transactionTypes
            .map(transact => {
                // Convert the Mongoose document to a plain object
                const plainTransact = transact.toObject();
                // Filter responsibilityCenters to only include matching items
                const matchedResponsibilityCenters = plainTransact.responsibilityCenters.filter(t =>
                    new RegExp(responsibilityCenterToGeneral('CO')).test(t.particular)
                );
                // If no matching responsibilityCenters are found, exclude this transaction type
                if (matchedResponsibilityCenters.length === 0) return null;
                // Override responsibilityCenters with only the matching items
                return {
                    ...plainTransact,
                    responsibilityCenters: matchedResponsibilityCenters,
                };
            })
            // Remove any null values (transaction types with no matching responsibility centers)
            .filter(Boolean);

        const branch = responsibilityCenterToGeneral('CO') // the value should be from req.user.Region
        res.json({ transactionTypes: updatedTransactionTypes, employees: allEmployees, positionTitles })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}
