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

    router.post('/api/deletedata', [
        body('TableName', 'TableName is necessary').exists(),
        body('PrimaryKeyValue', 'PrimaryKeyValue Is necessary').exists(),
        body('InvoiceNumber', 'InvoiceNumber is necessary').exists(),
        body('IsProcessed', 'IsProcessed is necessary').exists()
    ], (req, res) => {


        console.log(req.body);

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



        connection.query('CALL datadelete_process(?,?,?)', [req.body.TableName, req.body.PrimaryKeyValue, req.body.InvoiceNumber], function (err, results, fields) {
            if (err) {

                console.log(err.sqlMessage);

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