module.exports = (function () {

    var express = require('express');
    var router = express.Router();

    router.get('/api/fetchprojects', (req, res) => {
        var mysql = require('mysql')
        var ConnectionString = require('./dbcredentials');

        var connection = mysql.createConnection(ConnectionString);

        connection.connect();

        connection.query('SELECT * FROM Projects', function (err, results, fields) {
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