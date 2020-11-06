module.exports = (function () {

    var express = require('express');
    var router = express.Router();

    router.get('/api/appprovedentries', (req, res) => {

        var mysql = require('mysql')
        var ConnectionString = require('./dbcredentials');

        var connection = mysql.createConnection(ConnectionString);

        connection.connect();


        connection.query('CALL online_getapprovedentries()', function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    Message: err.sqlMessage
                });
            }

            if (results[0].length <= 0) {
                res.status(500).json({
                    Message: "No pending approvals"
                })
            } else {
                res.send(results[0]);
            }
        })

        connection.end();

    })
    return router;
})();