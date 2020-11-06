const {
    json
} = require('body-parser');

module.exports = (function () {

    var express = require('express');
    var router = express.Router();
    const {
        body,
        validationResult
    } = require('express-validator');

    router.post('/api/chequelog', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.PartyId', 'Party Id is necessary').exists(),
        body('*.BankId', 'Bank Id is necessary').exists(),
        body('*.BankAccountId', 'Bank Account Id is necessary').exists(),
        body('*.ChequeReceivingDate', 'Cheque Receiving Date is necessary').exists(),
        body('*.ChequeClearingDate', 'Cheque Clearing Date is necessary').exists(),
        body('*.ChequeAmount', 'Cheque Amount is necessary').exists(),
        body('*.UserId', 'User Id is necessary').exists(),
        body('*.IsCleared', 'Is Clear Field is necessary').exists(),
        body('*.ChequeNumber', 'Cheque Number Field is necessary').exists(),
        body('*.ClearedBy', 'Cleared By Field is necessary').exists(),
        body('*.ImageId', 'Image Id Field is necessary').exists(),
        body('*.BankInvoiceId', 'Bank Invoice Field is necessary').exists(),
        body('*.ChequeIsFromBankId', 'Cheque is From Bank Field is necessary').exists(),
        body('*.ChequeStatusId', 'Cheque Status Id Field is necessary').exists(),
        body('*.InvoiceNumber', 'Invoice Number Field is necessary').exists(),
        body('*.StatementDateTime', 'Statement Date is necessary').exists(),
        body('*.BillNumber', 'Bill Number Field is necessary').exists(),
        body('*.Particulars', 'Particulars Field is necessary').exists(),
        body('*.IsSync', 'Is Sync is necessary').exists()
    ], (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                Message: "Validation Failed , Action Received invalid Values"
            });
        }

        var mysql = require('mysql')
        var ConnectionString = require('./dbcredentials');

        var connection = mysql.createConnection(ConnectionString);

        connection.connect();

        connection.query('CALL cheque_log_process(?)', [JSON.stringify(req.body)], function (err, results, fields) {

            if (err) {
                res.status(500).json({
                    Message: err.sqlMessage
                });
            }

            res.send(results);
        })

        connection.end();

    })

    return router;
})();