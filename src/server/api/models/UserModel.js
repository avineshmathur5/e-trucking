const bcrypt = require('bcrypt'),
    config = require('../../config'),
    mongoose = require('mongoose'),
    schemaModels = require('../../db/schema'),
    userModel = schemaModels.models.userModel,
    roleModel = schemaModels.models.roleModel,
    permissionModuleModel = schemaModels.models.permissionModuleModel;
module.exports = {
    getUsers: function (conditions = {}, fields, cb) {
        if (typeof fields == 'object') {
            fields = fields.join(' ');
        }
        return new Promise(function (resolve, reject) {
            userModel.find(conditions, function (err, users) {
                err ? reject(err) : resolve(users);
            }).select(fields);
        })
    },
    getUserDetails: function (conditions = {}) {
        const self = this;
        if (typeof fields == 'string') {
            fields = fields.split(' ');
        }
        return new Promise(function (resolve, reject) {
            userModel.find(conditions)
                .populate({
                    path: 'role_id',
                    populate: {
                        path: 'permissions.permission_module_id'
                    }
                })
                .exec(function (err, users) {
                    var resUsers = [];
                    if (err) {
                        reject(err);
                    } else {
                        resolve(self._formatUserData(users));
                    }
                });
        });

    },
    saveUser: function (data) {
        var newUser = new userModel(data);
        newUser.password = bcrypt.hashSync(data.password, config.bcryptSalt);
        return new Promise(function (resolve, reject) {
            newUser.save(function (err, user) {
                err ? reject(err) : resolve(user);
            });
        });
    },
    _getModuleNamesById: function (ids, cb) {
        permissionModuleModel.find(
            { _id: { $in: ids } },
        )
            .exec(function (err, data) {
                cb(data);
            });
    },

    _formatUserData: function (users) {
        var resUsers = [];
        users.forEach(function (user, i) {
            resUsers[i] = JSON.parse(JSON.stringify(user));
            resUsers[i].role = resUsers[i].role_id;
            delete resUsers[i].role_id;
            var permissions = resUsers[i].role.permissions.map(function (rp, rpi) {
                var permission = rp;
                const permissionModule = permission.permission_module_id;
                permission['module'] = permissionModule.name;
                permission['module_id'] = permissionModule._id;
                delete permission.permission_module_id;
                return permission;
            });
            delete resUsers[i].role.permissions;
            resUsers[i].role['permissions'] = permissions;
        });
        if (resUsers.length == 1) {
            resUsers = resUsers[0];
        }
        return resUsers;
    }
}