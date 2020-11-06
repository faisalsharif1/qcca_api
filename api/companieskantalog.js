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

    router.post('/api/companieskantalog', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.SerialId', 'SerialId is necessary').exists(),
        body('*.ItemType', 'ItemType is necessary').exists(),
        body('*.VehicleNumber', 'VehicleNumber is necessary').exists(),
        body('*.SecondWeightDateTime', 'SecondWeightDateTime is necessary').exists(),
        body('*.DriverName', 'DriverName is necessary').exists(),
        body('*.DriverContactNumber', 'DriverContactNumber is necessary').exists(),
        body('*.WeightInKilograms', 'WeightInKilograms is necessary').exists(),
        body('*.WeightInTons', 'WeightInTons is necessary').exists(),
        body('*.WeightInMounds40', 'WeightInMounds40 is necessary').exists(),
        body('*.WeightInMounds42', 'WeightInMounds42 is necessary').exists(),
        body('*.PricePerTon', 'PricePerTon is necessary').exists(),
        body('*.TotalPrice', 'TotalPrice is necessary').exists(),
        body('*.AdditionalPrice', 'AdditionalPrice is necessary').exists(),
        body('*.FinalPrice', 'FinalPrice is necessary').exists(),
        body('*.MineId', 'MineId is necessary').exists(),
        body('*.AccountId', 'AccountId is necessary').exists(),
        body('*.UserId', 'UserId is necessary').exists(),
        body('*.Kanta_General_Id', 'Kanta_General_Id is necessary').exists(),
        body('*.InvoiceNumber', 'InvoiceNumber is necessary').exists(),
        body('*.TruckIsFor', 'TruckIsFor is necessary').exists(),
        body('*.CompanyChargesId', 'CompanyChargesId is necessary').exists(),
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

        connection.query('CALL company_kanta_log_process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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