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

    router.post('/api/employeeattendences', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.EntryDateTime', 'EntryDateTime is necessary').exists(),
        body('*.CheckInDateTime', 'CheckInDateTime is necessary').exists(),
        body('*.CheckOutDateTime', 'CheckOutDateTime is necessary').exists(),
        body('*.EmployeeId', 'EmployeeId is necessary').exists(),
        body('*.UserId', 'UserId is necessary').exists(),
        body('*.IsOnLeave', 'IsOnLeave is necessary').exists(),
        body('*.IsPresent', 'IsPresent is necessary').exists(),
        body('*.TotalDutyHours', 'TotalDutyHours is necessary').exists(),
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

        connection.query('CALL employeeattendences_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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