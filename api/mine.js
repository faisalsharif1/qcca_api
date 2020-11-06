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

    router.post('/api/mine', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.MineDescription', 'MineDescription is necessary').exists(),
        body('*.AreaId', 'AreaId is necessary').exists(),
        body('*.MineStatusId', 'MineStatusId is necessary').exists(),
        body('*.CurrentCompanyId', 'CurrentCompanyId is necessary').exists(),
        body('*.AgreementValue', 'AgreementValue is necessary').exists(),
        body('*.AgreementType', 'AgreementType is necessary').exists(),
        body('*.UnitId', 'UnitId is necessary').exists(),
        body('*.MineDegree', 'MineDegree is necessary').exists(),
        body('*.MateId', 'MateId is necessary').exists(),
        body('*.MinesOwnedBy', 'MinesOwnedBy is necessary').exists(),
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

        connection.query('CALL mine_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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