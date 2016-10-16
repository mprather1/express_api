var promise = require("bluebird");

var options = {
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = "postgres://postgres:postgres@localhost:5432/api";
var db = pgp(connectionString);

function getAllUsers(req, res, next){
  db.any('select * from users')
  .then(function(data){
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL users'
      });
  })
  .catch(function(err){
    return next(err);
  });
}

module.exports = {
  getAllUsers: getAllUsers
  // getSingleUser: getSingleUser,
  // createUser: createUser,
  // updateUser: updateUser,
  // removeUser: removeUser
};
