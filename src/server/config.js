module.exports = {
  jwtTokenExpires: 2,
  db: {
    url: 'mongodb://vineetkumar1987:Vineetkumar1987#@ds031581.mlab.com:31581/etrucking'
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
