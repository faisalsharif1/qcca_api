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

    router.post('/api/purchases', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.SupplierId', 'SupplierId is necessary').exists(),
        body('*.PurchaseDate', 'PurchaseDate is necessary').exists(),
        body('*.InvoiceNumber', 'InvoiceNumber is necessary').exists(),
        body('*.BillNumber', 'BillNumber is necessary').exists(),
        body('*.Amount', 'Amount is necessary').exists(),
        body('*.UserId', 'UserId is necessary').exists(),
        body('*.Discount', 'Discount is necessary').exists(),
        body('*.IsSync', 'IsSync is necessary').exists(),
    ], (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({
                Message: "Validation Failed , Action Received invalid Values"
            });
        }

        var mysql = require('mysql')
        var ConnectionString = require('./dbcredentials');

        var connection = mysql.createConnection(ConnectionString);

        connection.connect();

        connection.query('CALL purchases_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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