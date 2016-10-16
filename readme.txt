
#Edit /etc/postgresql/9.4/main/pg_hba.conf 

local   all             postgres                                trust #peer

#######################################################################

#change postgres user password
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

#run db.sql to create database
psql -f db.sql -U postgres
knex migrate:make users
knex migrate:latest --env development
knex migrate:latest --env test
knex migrate:latest --env production

#GET users
curl http://127.0.0.1:3000/api/users

#GET users/:id
curl http://127.0.0.1:3000/api/users/:id

#POST user
curl -H "Content-Type: application/json" -X POST -d '{"name":"killbill","email":"killbill","age":150}' http://127.0.0.1:3000/api/users

#PUT user
curl -H "Content-Type: application/json" -X PUT -d '{"name":"Kill Bill","email":"killbill@example.com","age":200}' http://127.0.0.1:3000/api/users/2

#DELETE user
curl -X DELETE http://127.0.0.1:3000/api/users/1