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

    router.post('/api/companypertoncharges', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.AgreementDate', 'AgreementDate is necessary').exists(),
        body('*.CompanyId', 'CompanyId is necessary').exists(),
        body('*.MineId', 'MineId is necessary').exists(),
        body('*.PerTonRate', 'PerTonRate is necessary').exists(),
        body('*.TotalTons', 'TotalTons is necessary').exists(),
        body('*.TotalAmount', 'TotalAmount is necessary').exists(),
        body('*.IsActive', 'IsActive is necessary').exists(),
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

        connection.query('CALL company_pertoncharges_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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