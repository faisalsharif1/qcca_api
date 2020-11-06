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

    router.post('/api/employees', [body().isArray(),
        body('*.Id', 'Id is necessary').exists(),
        body('*.EmployeeType', 'EmployeeType is necessary').exists(),
        body('*.EmployeeName', 'EmployeeName is necessary').exists(),
        body('*.EmployeeCNIC', 'EmployeeCNIC is necessary').exists(),
        body('*.MineId', 'MineId is necessary').exists(),
        body('*.PartyId', 'PartyId is necessary').exists(),
        body('*.EmployeeJoiningDate', 'EmployeeJoiningDate is necessary').exists(),
        body('*.EmployeeLeavingDate', 'EmployeeLeavingDate is necessary').exists(),
        body('*.EmployeeSalary', 'EmployeeSalary is necessary').exists(),
        body('*.EmployeePicture', 'EmployeePicture is necessary').exists(),
        body('*.IsActive', 'IsActive is necessary').exists(),
        body('*.WorksUnderEmployeeId', 'WorksUnderEmployeeId is necessary').exists(),
        body('*.FMD', 'FMD is necessary').exists(),
        body('*.FMD2', 'FMD2 is necessary').exists(),
        body('*.DailyWorkingHours', 'DailyWorkingHours is necessary').exists(),
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

        connection.query('CALL employees_Process(?)', [JSON.stringify(req.body)], function (err, results, fields) {
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