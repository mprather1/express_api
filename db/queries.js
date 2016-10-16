var promise = require("bluebird");
var options = {
  promiseLib: promise
};
var config = require("../_config");
var environment = process.env.NODE_ENV || 'development';
var pgp = require("pg-promise")(options);
var connectionString = config.postgresURI[environment];
var db = pgp(connectionString);

function getAllUsers(req, res, next){
  db.any('select * from users')
  .then(function(data){
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: "Retrieved ALL users"
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

function updateUser(req, res, next){
  db.none('update users set name=$1, email=$2, age=$3 where id=$4', [req.body.name, req.body.email, parseInt(req.body.age), parseInt(req.params.id)])
    .then(function(){
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function(err){
      return next(err);
    });
}

function removeUser(req, res, next){
  var userID = parseInt(req.params.id);
  db.result('delete from users where id = $1', userID)
    .then(function(result){
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} user`
        });
    })
    .catch(function(err){
      return next(err);
    });
}


module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};
