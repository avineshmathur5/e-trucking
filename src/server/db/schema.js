const config = require('../config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schemas = {
    users: new Schema({
        _id: Schema.Types.ObjectId,
        role_id: {
            type: Schema.Types.ObjectId,
            ref: 'roles',
        },
        name: String,
        email: String,
        dob: { type: Date, default: Date.now },
        blood_group: String,
        contact: String,
        marital_status: { type: String, enum: config.marital_status },
        address: {
            local: {
                address: String,
                city: String,
                pincode: { type: Number, maxlength: 6 },
                state: String,
                country: String
            },
            permanent: {
                address: String,
                city: String,
                pincode: { type: Number, maxlength: 6 },
                state: String,
                country: String
            }
        },
        password: String
    }),
    roles: new Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        alias: String,
        permissions: [{
            permission_module_id: {
                type: Schema.Types.ObjectId,
                ref: 'permission_modules'
            },
            add: Number,
            edit: Number,
            view: Number,
            delete: Number
        }]

    }),
    permission_modules: new Schema({
        name: String
    }),
};



const models = {
    roleModel: mongoose.model('roles', schemas.roles),
    userModel: mongoose.model('users', schemas.users),
    permissionModuleModel: mongoose.model('permission_modules', schemas.permission_modules),
}

module.exports = {
    schemas,
    models
};