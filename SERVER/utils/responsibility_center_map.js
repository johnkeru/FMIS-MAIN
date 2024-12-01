const { CO, CO_BASED_PROJECTS, RIO, IISO, PMO, IMO, DIVISION_OFFICE } = require("../enums/region");

exports.responsibilityCenterToGeneral = (region) => {
    // Define mappings with allowed values
    const mappings = [
        { type: CO, values: ['CO', 'Central Office'] },
        { type: CO_BASED_PROJECTS, values: ['CO_BASED_PROJECTS', 'CO Based Projects'] },
        { type: RIO, values: ['RIO', 'Regional Irrigation Offices'] },
        { type: IISO, values: ['IISO', 'Integrated Irrigation Systems Organization'] },
        { type: PMO, values: ['PMO', 'Project Management Office'] },
        { type: IMO, values: ['IMO', 'Irrigation Management Organization'] },
        { type: DIVISION_OFFICE, values: ['DIVISION_OFFICE'] }
    ];

    // Check for a match
    for (let { type, values } of mappings) {
        if (values.some(value => new RegExp(value, 'i').test(region))) {
            return type; // Return the type associated with the matched value
        }
    }

    // If no match is found, return null or a default value
    return null;
};
