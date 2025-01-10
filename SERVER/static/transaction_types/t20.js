const POSITIONS = require("./positions_enum");

module.exports = {
  reportName: "DISBURSEMENT VOUCHER",
  transactionType: "Honorarium - BAC",
  responsibilityCenters: [
    {
      particular: "CO & CO-Based Projects",
      // under division manager
      positionTypes: [
        {
          positionType: "Below Division Manager",
          boxes: [
            {
              name: "BOX A CERTIFIED",
              findPosition: POSITIONS.BAC_CHAIRMAN.findPosition,
              displayPosition: POSITIONS.BAC_CHAIRMAN.displayPosition,
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

        {
          positionType: "Division Manager",
          boxes: [
            {
              name: "BOX A CERTIFIED",
              findPosition: POSITIONS.BAC_CHAIRMAN.findPosition,
              displayPosition: POSITIONS.BAC_CHAIRMAN.displayPosition,
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

        {
          positionType: "Department Manager & Project Manager",
          boxes: [
            {
              name: "BOX A CERTIFIED",
              findPosition: POSITIONS.BAC_CHAIRMAN.findPosition,
              displayPosition: POSITIONS.BAC_CHAIRMAN.displayPosition,
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

        {
          positionType:
            "Department Manager, under Office of the Administrator -Top Management -IAS -CORPLAN -PAIS -LEGAL",
          boxes: [
            {
              name: "BOX A CERTIFIED",
              findPosition: POSITIONS.BAC_CHAIRMAN.findPosition,
              displayPosition: POSITIONS.BAC_CHAIRMAN.displayPosition,
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
