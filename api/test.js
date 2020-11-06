module.exports = (function () {

    var express = require('express');
    var router = express.Router();

    router.get('/api/test', (req, res) => {
        res.send({
            hello: "how are you"
        });
    })
    return router;
})();