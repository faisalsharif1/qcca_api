const {
    json
} = require('body-parser');
const {
    connect
} = require('./dbcredentials');

module.exports = (function () {

    var express = require('express');
    var router = express.Router();
    const {
        body,
        validationResult
    } = require('express-validator');

    router.post('/api/transactions', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.SerialNo', 'SerialNo is necessary').exists(),
        body('*.InvoiceNumber', 'InvoiceNumber is necessary').exists(),
        body('*.TransactionDate', 'TransactionDate is necessary').exists(),
        body('*.BillNumber', 'BillNumber is necessary').exists(),
        body('*.ChequeNumber', 'ChequeNumber is necessary').exists(),
        body('*.Particulars', 'Particulars is necessary').exists(),
        body('*.AccountId', 'AccountId is necessary').exists(),
        body('*.Amount', 'Amount is necessary').exists(),
        body('*.UserId', 'UserId is necessary').exists(),
        body('*.ProjectId', 'ProjectId is necessary').exists(),
        body('*.MineId', 'MineId is necessary').exists(),
        body('*.ImageId', 'ImageId is necessary').exists(),
        body('*.IsApproved', 'IsApproved is necessary').exists(),
        body('*.IsManualEntry', 'IsManualEntry is necessary').exists(),
        body('*.TotalTons', 'TotalTons is necessary').exists(),
        body('*.PerTonValue', 'PerTonValue is necessary').exists(),
        body('*.PaymentType', 'PaymentType is necessary').exists(),
        body('*.PurchaseDetailId', 'PurchaseDetailId is necessary').exists(),
        body('*.IncExpTag', 'IncExpTag is necessary').exists(),
        body('*.ProjectIdType', 'ProjectIdType is necessary').exists(),
        body('*.IsProcessed', 'IsProcessed is necessary').exists(),
        body('*.IsSync', 'IsSync is necessary').exists(),
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

        connection.query('CALL transactions_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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