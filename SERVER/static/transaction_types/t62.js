const POSITIONS = require("./positions_enum");

module.exports = {
  reportName: "DISBURSEMENT VOUCHER",
  transactionType:
    "Repair and Maintenance of Aircraft, Equipment and Motor Vehicles",
  responsibilityCenters: [
    {
      particular: "CO & CO-Based Projects",
      // under division manager
      positionTypes: [
        {
          positionType: "Suppliers and Other Individuals/Agency Outside NIA",
          boxes: [
            {
              name: "BOX A CERTIFIED",
              findPosition: POSITIONS.DEPARTMENT_MANAGER_2.findPosition,
              displayPosition: POSITIONS.DEPARTMENT_MANAGER_2.displayPosition,
            },
            {
              name: "BOX C CERTIFIED",
              findPosition: POSITIONS.MANAGER_ACCOUNTING_DIVISION.findPosition,
              displayPosition:
                POSITIONS.MANAGER_ACCOUNTING_DIVISION.displayPosition,
              department: "FINANCIAL MANAGEMENT DEPARTMENT",
              division: "ACCOUNTING DIVISION",
            },
            {
              name: "BOX D APPROVED FOR PAYMENT",
              findPosition:
                POSITIONS
                  .DEPUTY_ADMINISTRATOR_FOR_ADMINISTRATIVE_AND_FINANCE_SECTOR
                  .findPosition,
              displayPosition:
                POSITIONS
                  .DEPUTY_ADMINISTRATOR_FOR_ADMINISTRATIVE_AND_FINANCE_SECTOR
                  .displayPosition,
            },
          ],
        },
      ],
    },
  ],
};
