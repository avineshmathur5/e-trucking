const config = require('../../config'),
  verifyToken = require('./verifyToken'),
  filterAuthUrls = require('./filterAuth'),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  path = require('path'),
  ObjectId = mongoose.Types.ObjectId,
  userModel = require('../models/UserModel');

module.exports = {
  extractToken: function (req) {
    const authorizationHeader = req.get('Authorization');
    var token = null;
    if (authorizationHeader) {
      token = authorizationHeader.replace('Bearer ', '');
    }
    return token;
  },
  verifyToken: function (req) {
    var response = { status: 403, message: 'Unauthorized', data: [] },
      self = this,
      token = this.extractToken(req);
    return new Promise(function (resolve, reject) {
      if (config.enableAuth && !self._checkAuthAndPermissionsUrl(req, 'auth')) {
        verifyToken(token, (err, claims) => {
          if (err) {
            response.message = err.message;
            reject(response);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  },
  checkRolePermissions: function (req) {
    const self = this;
    return new Promise(function (resolve, reject) {
      if (config.enableCheckPermissions && !self._checkAuthAndPermissionsUrl(req, 'permissions')) {
        const token = self.extractToken(req),
          userId = jwt.decode(token).data.id,
          userPromise = userModel.getUserDetails({ "_id": ObjectId(userId) });

        userPromise.then(function (user) {
          if (user) {
            const permissions = user.role.permissions;
            apiUrlArr = self._simplifyUrl(req, 'array'),
              hasPermission = false,
              permissions.forEach(function (permission) {
                if (permission.module == [apiUrlArr[0]] && permission[apiUrlArr[1]] == 1) {
                  hasPermission = true;
                  return false;
                }
              });
            hasPermission ? resolve() : reject({ 'message': 'User does not have permission' });
          }
        })
          .catch(function (err) {
            reject(err.message);
          });
      } else {
        resolve();
      }
    });
  },


  _checkAuthAndPermissionsUrl: function (req, type) {
    const authUrls = filterAuthUrls.auth,
      permissionUrls = filterAuthUrls.permissions;
    var url = this._simplifyUrl(req);
    if (type == 'auth') {
      return (authUrls[url] || authUrls['/' + url]);
    } else if (type == 'permissions') {
      return (permissionUrls[url] || permissionUrls['/' + url]);
    }
    return true;
  },

  _simplifyUrl: function (req, format) {
    var url = req.originalUrl.replace(config.apiPrefix, '');
    //trimming url upto 2 parts (for eg : a/b/c/d/e will become a/b) for url checking
    url = url.split('/').slice(1, 3).join('/');
    if (!url.split('/')[1].length) {
      url += 'list';
    }
    if (format == 'array') {
      return url.split('/');
    }
    return url;
  }
}