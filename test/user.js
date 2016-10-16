var chai = require("chai");
var chaiHttp = require("chai-http");
var server = 'http://localhost:3000';
var expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function(){
  it('should list ALL users on /users GET', function(done){
    chai.request(server)
      .get('/api/users')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).to.be.a('array');
        done();
      });
  });
  
  it('should list a SINGLE user on /user/:id GET');
  it('should add a SINGLE user on /users POST', function(done) {
    chai.request(server)
    .post('/api/users')
    .send({"name":"Mike", "email":"mike@example.com", "age":34})
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.status('success');
      expect(res.body)
      
      done();
    });
  });
  it('should update a SINGLE user on /users/:id PUT');
  it('should delete a SINGLE user on /users/:id DELETE');
});