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

    router.post('/api/areas', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.AreaName', 'Area Name Is necessary').exists(),
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

        connection.query('CALL areas_process(?)', [JSON.stringify(req.body)], function (err, results, fields) {

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