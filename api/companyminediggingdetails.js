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

    router.post('/api/companyminediggingdetails', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.EntryDatTime', 'EntryDatTime is necessary').exists(),
        body('*.PartyId', 'PartyId is necessary').exists(),
        body('*.Mine', 'Mine is necessary').exists(),
        body('*.Unit', 'Unit is necessary').exists(),
        body('*.TotalUnits', 'TotalUnits is necessary').exists(),
        body('*.UnitPrice', 'UnitPrice is necessary').exists(),
        body('*.TotalPrice', 'TotalPrice is necessary').exists(),
        body('*.InvoiceNumber', 'InvoiceNumber is necessary').exists(),
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

        connection.query('CALL company_mine_diggingdetails_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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