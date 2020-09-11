# mern_w_passport


https://github.com/leivanoe1011/mern_w_passport.git

http://localhost:5000/user/register
Registration Body
{
    "username" : "testing1",
    "password" : "testing123",
    "role" : "user"
}


http://localhost:5000/user/login

Login Body
{
    "username" : "testing1",
    "password" : "testing123"
}


http://localhost:5000/user/logout


http://localhost:5000/user/todo

{
    "name" : "todoTest1"
}

http://localhost:5000/user/todos


MongoDB(Mongoose ORM) - Database



Express - Web Framework
React - Client Side UI
NodeJS - Server
PassportJS - Authentication Middleware
JWT(JSON WEB TOKENS) - For Authorization

Cookie Parser

Mongoose
Instead of writing noSql Directly
Create a model and based on that model Mongoose will translate for the APP

Nodemon will restart the server when saving new content in the app

passport

passport-local
strategy authenticate against the database using username and password

passport-jwt


json web token
sign jwt token


