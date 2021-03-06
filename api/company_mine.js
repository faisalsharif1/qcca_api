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

    router.post('/api/companymine', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.ActivityDateTime', 'ActivityDateTime is necessary').exists(),
        body('*.PartyId', 'PartyId is necessary').exists(),
        body('*.MineId', 'MineId is necessary').exists(),
        body('*.MateId', 'MateId is necessary').exists(),
        body('*.MineStatusId', 'MineStatusId is necessary').exists(),
        body('*.Rate', 'Rate is necessary').exists(),
        body('*.Unit', 'Unit is necessary').exists(),
        body('*.AgreementType', 'AgreementType is necessary').exists(),
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

        connection.query('CALL company_mine_process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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