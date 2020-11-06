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

    router.post('/api/kantamineadditionalpackages', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.MineCondition', 'MineCondition is necessary').exists(),
        body('*.TypeCondition', 'TypeCondition is necessary').exists(),
        body('*.AccountIdCondition', 'AccountIdCondition is necessary').exists(),
        body('*.AccountIdCondition_CompanyId', 'AccountIdCondition_CompanyId is necessary').exists(),
        body('*.IsFixed', 'IsFixed is necessary').exists(),
        body('*.IsCredit', 'IsCredit is necessary').exists(),
        body('*.PerTonValue', 'PerTonValue is necessary').exists(),
        body('*.FixedValue', 'FixedValue is necessary').exists(),
        body('*.Particulars', 'Particulars is necessary').exists(),
        body('*.Type', 'Type is necessary').exists(),
        body('*.EntryInAccount', 'EntryInAccount is necessary').exists(),
        body('*.EntryInAccount_CompanyId', 'EntryInAccount_CompanyId is necessary').exists(),
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

        connection.query('CALL kanta_mine_additionalpackages_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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