const authorize = require('../auth/authorize');
const bcrypt = require('bcrypt');
const generateToken = require('../auth/generateToken');
const userModel = require('../models/UserModel');
module.exports = {
    name: 'users',
    get: {
        index: function (req, res, next) {
            userModel.getUserDetails({}, ['id', 'role_id', 'fname', 'lname', 'email'])
                .then(function (users) {
                    var response = { message: 'User not found!' };
                    if (users.length) {
                        response.message = 'Users';
                    }
                    response.data = users;
                    res.rest.success(response);
                })
                .catch(function (err) {
                    res.rest.serverError({ error: err.message });
                });
        }
    },
    post: {
        add: function (req, res, next) {
            console.log(req.body);
            return;
            userModel.saveUser(req.body)
                .then(function (response) {
                    res.rest.success({ 'message': 'User saved successfully!' });
                })
                .catch(function (err) {
                    res.rest.serverError({ 'message': 'Error : User could not be saved!' });
                });
        },
        login: function (req, res, next) {
            const email = req.body.email;
            const password = req.body.password;
            var response = { message: 'User not found!', data: [] };
            userModel.getUsers({ 'email': email })
                .then(function (user) {
                    if (user.length && bcrypt.compareSync(password, user[0].password)) {
                        generateToken({ id: user.id, email: user.email, name: user.fname }, function (err, token) {
                            if (!err) {
                                response.message = 'Logged in successfully!';
                                user.password = '';
                                response.data = user;
                                response.token = token;
                            }
                            res.rest.success(response);
                        });
                    } else {
                        res.rest.success(response);
                    }
                })
                .catch(function (err) {
                    res.rest.serverError(err.message);
                    return next();
                });
        }
    }
}