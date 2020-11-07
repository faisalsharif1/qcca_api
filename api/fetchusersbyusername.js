module.exports = (function () {

    var express = require('express');
    var router = express.Router();

    router.get('/api/authenticateusers/:username/:userpassword', (req, res) => {
        var mysql = require('mysql')
        var ConnectionString = require('./dbcredentials');

        var connection = mysql.createConnection(ConnectionString);

        connection.connect();

        connection.query('SELECT * FROM users where username = ? and password = ? and isactive = 1', [req.params.username, req.params.userpassword], function (err, results, fields) {
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