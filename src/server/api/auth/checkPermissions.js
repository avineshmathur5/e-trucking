const authorize = require('./authorize');
module.exports = function (req, res, next) {
    authorize.verifyToken(req)
        .then(function () {
            //token is verified. now check user role permissions
            authorize.checkRolePermissions(req)
                .then(function () {
                    next();
                })
                .catch(function (err) {
                    res.rest.serverError({ error: err.message });
                });
        })
        .catch(function (err) {
            res.rest.serverError({ error: err.message });
        });
}