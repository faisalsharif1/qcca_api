module.exports = (function () {

    var express = require('express');
    var router = express.Router();

    router.get('/api/fetchpendinginvoicesonline', (req, res) => {
        var mysql = require('mysql')
        var ConnectionString = require('./dbcredentials');

        var connection = mysql.createConnection(ConnectionString);

        connection.connect();

        connection.query('SELECT distinct invoicenumber from online_transactions where isprocessed = 0', function (err, results, fields) {
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