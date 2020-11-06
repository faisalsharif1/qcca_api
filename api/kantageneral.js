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

    router.post('/api/kantageneral', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.EntryDateTime', 'EntryDateTime is necessary').exists(),
        body('*.VehicleNumber', 'VehicleNumber is necessary').exists(),
        body('*.WeightInKilograms', 'WeightInKilograms is necessary').exists(),
        body('*.WeightInTons', 'WeightInTons is necessary').exists(),
        body('*.WeightInMounds40Kg', 'WeightInMounds40Kg is necessary').exists(),
        body('*.WeightInMounds42Kg', 'WeightInMounds42Kg is necessary').exists(),
        body('*.UserId', 'UserId is necessary').exists(),
        body('*.HasDetail', 'HasDetail is necessary').exists(),
        body('*.InvoiceNumber', 'InvoiceNumber is necessary').exists(),
        body('*.CustomerTypeId', 'CustomerTypeId is necessary').exists(),
        body('*.VehicleType', 'VehicleType is necessary').exists(),
        body('*.TotalCharges', 'TotalCharges is necessary').exists(),
        body('*.CompanyId', 'CompanyId is necessary').exists(),
        body('*.IsEmpty', 'IsEmpty is necessary').exists(),
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

        connection.query('CALL kanta_general_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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