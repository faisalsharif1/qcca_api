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

    router.post('/api/companies', [body().isArray(),
        body('*.Id', 'Account Id is necessary').exists(),
        body('*.CustomerTypeId', 'Customer Type Id Is necessary').exists(),
        body('*.PartyName', 'Party Name is necessary').exists(),
        body('*.ContactNumber', 'Contact Number is necessary').exists(),
        body('*.PerTonRate', 'PerTonRate is necessary').exists(),
        body('*.AccountId', 'AccountId is necessary').exists(),
        body('*.Limit', 'Limit is necessary').exists(),
        body('*.IsBalanceCheckOn', 'Balance Check On Field is necessary').exists(),
        body('*.CNICNumber', 'CNIC is necessary').exists(),
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

        connection.query('CALL companies_process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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