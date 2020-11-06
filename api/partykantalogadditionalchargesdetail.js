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

    router.post('/api/partykantalogadditionalchargesdetail', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.Kanta_General_Id', 'Kanta_General_Id is necessary').exists(),
        body('*.ChargesDescription', 'ChargesDescription is necessary').exists(),
        body('*.Charges', 'Charges is necessary').exists(),
        body('*.AccountId', 'AccountId is necessary').exists(),
        body('*.InvoiceNumber', 'InvoiceNumber is necessary').exists(),
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

        connection.query('CALL party_kanta_log_additionalchargesdetail_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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