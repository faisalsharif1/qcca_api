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

    router.post('/api/account', [body().isArray(),
        body('*.AccountId', 'Account Id is necessary').exists(),
        body('*.AccountTitle', 'Account Title Is necessary').exists(),
        body('*.CategoryId', 'Category Id is necessary').exists(),
        body('*.AccountCode', 'Account code is necessary').exists(),
        body('*.ContactNo', 'Contact No is necessary').exists(),
        body('*.CNICNumber', 'CNIC Number is necessary').exists(),
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

        console.log("'" + JSON.stringify(req.body) + "'");

        connection.query('CALL accounts_process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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