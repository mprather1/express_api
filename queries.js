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

function getSingleUser(req, res, next){
  var userID = parseInt(req.params.id);
  db.one('select * from users where id = $1', userID)
    .then(function(data){
      res.status(200)
       .json({
         status: 'success',
         data: data,
         message: 'Retrieved ONE user'
       });
    })
    .catch(function(err){
      return next(err);
    });
}

function createUser(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into users(name, email, age)' +
      'values(${name}, ${email}, ${age})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser
  // updateUser: updateUser,
  // removeUser: removeUser
};
