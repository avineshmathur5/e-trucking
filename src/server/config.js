module.exports = {
  jwtTokenExpires: 2,
  db: {
    host: 'localhost',
    dbName: 'etrucking'
  },
  marital_status : ['single', 'married', 'divorcee', 'widowed'],
  apiPrefix: '/api/v1',
  users: {
    admin: { password: 'password' }
  },
  bcryptSalt: 10,
  jwtSecret: '09sdufa0sfusafkljsa098',
  host: 'localhost',
  port: process.env.PORT || 3005,
  enableAuth: true,
  enableCheckPermissions: true
}
