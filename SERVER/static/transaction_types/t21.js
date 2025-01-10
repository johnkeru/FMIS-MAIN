const POSITIONS = require("./positions_enum");

module.exports = {
  reportName: "DISBURSEMENT VOUCHER",
  transactionType: "Governing Boards of Collegial Bodies",
  responsibilityCenters: [
    {
      particular: "CO & CO-Based Projects",
      // under division manager
      positionTypes: [
        {
          positionType:
            "Department Manager, under Office of the Administrator -Top Management -IAS -CORPLAN -PAIS -LEGAL",
          boxes: [
            {
              name: "BOX A CERTIFIED",
              findPosition: POSITIONS.CORPORATE_BOARD_SECRETARY.findPosition,
              displayPosition:
                POSITIONS.CORPORATE_BOARD_SECRETARY.displayPosition,
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
          positionType: "Suppliers and Other Individuals/Agency Outside NIA",
          boxes: [
            {
              name: "BOX A CERTIFIED",
              findPosition: POSITIONS.CORPORATE_BOARD_SECRETARY.findPosition,
              displayPosition:
                POSITIONS.CORPORATE_BOARD_SECRETARY.displayPosition,
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
