
Edit /etc/postgresql/9.4/main/pg_hba.conf 

local   all             postgres                                trust #peer

#######################################################################

sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

psql -f users.sql -U postgres

#POST user
curl -H "Content-Type: application/json" -X POST -d '{"name":"killbill","email":"killbill","age":150}' http://127.0.0.1:3000/api/users

#PUT user
curl -H "Content-Type: application/json" -X PUT -d '{"name":"Kill Bill","email":"killbill@example.com","age":200}' http://127.0.0.1:3000/api/users/2
