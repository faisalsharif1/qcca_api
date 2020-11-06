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

    router.post('/api/banks', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.BankName', 'Bank Account Is necessary').exists(),
        body('*.BankContact', 'Bank Contact Is necessary').exists(),
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

        connection.query('CALL banks_process(?)', [JSON.stringify(req.body)], function (err, results, fields) {

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